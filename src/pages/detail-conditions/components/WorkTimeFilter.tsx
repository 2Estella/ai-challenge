import React from 'react';
import { useSearchStore } from '@/stores/searchStore';
import { FilterSection } from '../FilterSection';
import TabSelector from '@/components/TabSelector';
import Checkbox from '@/components/Checkbox';
import { useDirectTimeSelection } from '@/lib/hooks/useDirectTimeSelection';

export const WorkTimeFilter: React.FC = () => {
  const {
    conditions,
    toggleStates,
    selectedTabs,
    checkboxes,
    setToggleState,
    setSelectedTab,
    setCheckbox,
    getSelectedCount
  } = useSearchStore();

  // 직접 선택 시간 상태 관리 - 커스텀 훅 사용
  const { timeSelection, setStartTime, setEndTime, resetTimeSelection } = useDirectTimeSelection();

  if (!conditions) return null;

  const { workTime } = conditions;

  // 시간 옵션 생성 (00:00 ~ 24:00, 30분 간격)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour <= 24; hour++) {
      const hourStr = hour.toString().padStart(2, '0');
      options.push(`${hourStr}:00`);
      if (hour < 24) {
        options.push(`${hourStr}:30`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();
  const isDirectSelection = selectedTabs.workTime === 'direct';

  // 탭 변경 시 시간 상태 초기화
  const handleTabChange = (tabId: string) => {
    if (tabId !== selectedTabs.workTime) {
      resetTimeSelection();
    }
    setSelectedTab('workTime', tabId);
  };

  return (
    <FilterSection
      title={workTime.name}
      maxCount={workTime.maxCount || 3}
      currentCount={getSelectedCount('workTime')}
      hideCounter={isDirectSelection}
    >
      <TabSelector
        tabs={[
          { id: 'list', label: '목록에서 선택', isSelected: selectedTabs.workTime === 'list' },
          { id: 'direct', label: '직접 선택', isSelected: selectedTabs.workTime === 'direct' }
        ]}
        onTabChange={handleTabChange}
      />

      {isDirectSelection ? (
        // 직접 선택 탭일 때 시작시간~종료시간 셀렉트박스 렌더링
        <div className="filter-work-time__direct">
          <div className="filter-work-time__direct__selectbox">
            <div className="filter-work-time__direct__selectbox-container">
              <select
                title="시작시간"
                name="minTime"
                id="minTime"
                value={timeSelection.startTime}
                onChange={(e) => setStartTime(e.target.value)}
                aria-label="근무 시작 시간을 선택하세요"
              >
                <option disabled hidden value="">시작시간</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <span className="filter-work-time__direct__selectbox-container__icon">
                <i className="Icon_icon__BlZpj icon-system_select_arrow_down" style={{ fontSize: '24px' }}></i>
              </span>
            </div>
          </div>
          <span className="filter-work-time__direct__separator">~</span>
          <div className="filter-work-time__direct__selectbox">
            <div className="filter-work-time__direct__selectbox-container">
              <select
                title="종료시간"
                name="maxTime"
                id="maxTime"
                value={timeSelection.endTime}
                onChange={(e) => setEndTime(e.target.value)}
                aria-label="근무 종료 시간을 선택하세요"
              >
                <option disabled hidden value="">종료시간</option>
                {timeOptions.slice(1).map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <span className="filter-work-time__direct__selectbox-container__icon">
                <i className="Icon_icon__BlZpj icon-system_select_arrow_down" style={{ fontSize: '24px' }}></i>
              </span>
            </div>
          </div>
        </div>
      ) : (
        // 목록에서 선택 탭일 때 기존 옵션들 렌더링
        <div className="FilterSection__buttons">
          {workTime.collection.map((option) => (
            <label
              key={option}
              className={`FilterSection__toggle-button ${toggleStates.workTime[option] ? 'is-selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={toggleStates.workTime[option] || false}
                onChange={(e) => setToggleState('workTime', option, e.target.checked)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      <Checkbox
        label="협의제외"
        checked={checkboxes.workTimeExclude}
        onChange={(checked) => setCheckbox('workTimeExclude', checked)}
      />
    </FilterSection>
  );
};
