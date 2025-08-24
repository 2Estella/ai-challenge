import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SearchConditions } from '@/types/data';
import type { WorkArea } from '@/types/search';

interface SearchState {
  // 데이터
  conditions: SearchConditions | null;
  isLoading: boolean;
  error: string | null;

  // 선택된 값들
  selectedTabs: {
    workDays: string;
    workTime: string;
  };

  checkboxes: {
    genderExclude: boolean;
    ageExclude: boolean;
    workDaysExclude: boolean;
    workTimeExclude: boolean;
  };

  toggleStates: {
    workPeriod: Record<string, boolean>;
    workDays: Record<string, boolean>;
    workTime: Record<string, boolean>;
    gender: Record<string, boolean>;
    employmentType: Record<string, boolean>;
  };

  // 근무지역 관련 상태 추가
  workAreaModal: {
    isOpen: boolean;
  };
  selectedWorkAreas: WorkArea[];
}

interface SearchActions {
  // 데이터 로딩
  loadConditions: () => Promise<void>;

  // 탭 변경
  setSelectedTab: (section: string, tabId: string) => void;

  // 체크박스 변경
  setCheckbox: (key: string, checked: boolean) => void;

  // 토글 상태 변경
  setToggleState: (category: string, key: string, checked: boolean) => void;

  // 근무지역 모달 관련 액션 추가
  openWorkAreaModal: () => void;
  closeWorkAreaModal: () => void;
  addWorkArea: (area: WorkArea) => void;
  removeWorkArea: (areaId: string) => void;

  // 초기화
  reset: () => void;

  // 선택된 개수 계산
  getSelectedCount: (category: string) => number;
}

export type SearchStore = SearchState & SearchActions;

const initialState: SearchState = {
  conditions: null,
  isLoading: false,
  error: null,
  selectedTabs: {
    workDays: 'list',
    workTime: 'list'
  },
  checkboxes: {
    genderExclude: true,
    ageExclude: true,
    workDaysExclude: false,
    workTimeExclude: false
  },
  toggleStates: {
    workPeriod: {},
    workDays: {},
    workTime: {},
    gender: {},
    employmentType: {}
  },
  // 근무지역 초기 상태
  workAreaModal: {
    isOpen: false
  },
  selectedWorkAreas: []
};

export const useSearchStore = create<SearchStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      async loadConditions() {
        set({ isLoading: true, error: null });
        try {
          const { loadSearchConditions } = await import('@/lib/dataLoader');
          const conditions = await loadSearchConditions();

          // 초기 토글 상태 설정
          const toggleStates = {
            workPeriod: Object.fromEntries(
              conditions.workPeriod.collection.map(item => [item, false])
            ),
            workDays: Object.fromEntries(
              conditions.workDays.collection.map(item => [item, false])
            ),
            workTime: Object.fromEntries(
              conditions.workTime.collection.map(item => [item, false])
            ),
            gender: Object.fromEntries(
              conditions.gender.collection.map(item => [item, false])
            ),
            employmentType: Object.fromEntries(
              conditions.employmentType.collection.map(item => [item, false])
            )
          };

          // 6개월~1년 기본 선택
          toggleStates.workPeriod['6개월~1년'] = true;

          set({
            conditions,
            toggleStates,
            isLoading: false
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : '데이터 로딩 실패',
            isLoading: false
          });
        }
      },

      setSelectedTab(section, tabId) {
        set(state => {
          // 탭 변경 시 해당 카테고리의 선택 상태 초기화
          const updatedToggleStates = { ...state.toggleStates };
          if (section === 'workDays') {
            updatedToggleStates.workDays = {};
          } else if (section === 'workTime') {
            updatedToggleStates.workTime = {};
          }

          return {
            selectedTabs: {
              ...state.selectedTabs,
              [section]: tabId
            },
            toggleStates: updatedToggleStates
          };
        });
      },

      setCheckbox(key, checked) {
        set(state => ({
          checkboxes: {
            ...state.checkboxes,
            [key]: checked
          }
        }));
      },

      setToggleState(category, key, checked) {
        set(state => ({
          toggleStates: {
            ...state.toggleStates,
            [category]: {
              ...state.toggleStates[category as keyof typeof state.toggleStates],
              [key]: checked
            }
          }
        }));
      },

      // 근무지역 모달 관련 액션
      openWorkAreaModal() {
        set(state => ({
          workAreaModal: {
            ...state.workAreaModal,
            isOpen: true
          }
        }));
      },

      closeWorkAreaModal() {
        set(state => ({
          workAreaModal: {
            ...state.workAreaModal,
            isOpen: false
          }
        }));
      },

      addWorkArea(area) {
        set(state => {
          // 중복 체크
          const isDuplicate = state.selectedWorkAreas.some(
            selectedArea => selectedArea.id === area.id
          );

          if (isDuplicate) {
            return state;
          }

          return {
            selectedWorkAreas: [...state.selectedWorkAreas, area]
          };
        });
      },

      removeWorkArea(areaId) {
        set(state => ({
          selectedWorkAreas: state.selectedWorkAreas.filter(area => area.id !== areaId)
        }));
      },

      reset() {
        set(initialState);
      },

      getSelectedCount(category) {
        const state = get();
        const categoryState = state.toggleStates[category as keyof typeof state.toggleStates];
        if (typeof categoryState === 'object') {
          return Object.values(categoryState).filter(Boolean).length;
        }
        return 0;
      }
    }),
    {
      name: 'search-store'
    }
  )
);
