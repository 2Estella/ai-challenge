import React from 'react';
import { useSearchStore } from '@/stores/searchStore';
import { FilterSection } from '../FilterSection';
import TabSelector from '@/components/TabSelector';
import Checkbox from '@/components/Checkbox';

export const WorkDaysFilter: React.FC = () => {
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

  if (!conditions) return null;

  const { workDays } = conditions;

  // 요일 옵션 정의
  const dayOptions = [
    { value: 'MONDAY', label: '월' },
    { value: 'TUESDAY', label: '화' },
    { value: 'WEDNESDAY', label: '수' },
    { value: 'THURSDAY', label: '목' },
    { value: 'FRIDAY', label: '금' },
    { value: 'SATURDAY', label: '토' },
    { value: 'SUNDAY', label: '일' }
  ];

  const isDirectSelection = selectedTabs.workDays === 'direct';

  return (
    <FilterSection
      title={workDays.name}
      maxCount={workDays.maxCount || 3}
      currentCount={getSelectedCount('workDays')}
      hideCounter={isDirectSelection}
    >
      <TabSelector
        tabs={[
          { id: 'list', label: '목록에서 선택', isSelected: selectedTabs.workDays === 'list' },
          { id: 'direct', label: '직접 선택', isSelected: selectedTabs.workDays === 'direct' }
        ]}
        onTabChange={(tabId) => setSelectedTab('workDays', tabId)}
      />

      {isDirectSelection ? (
        // 직접 선택 탭일 때 월~일 선택지 렌더링
        <div className="FilterSection__buttons">
          {dayOptions.map((option) => (
            <label
              key={option.value}
              className={`FilterSection__toggle-button ${toggleStates.workDays[option.value] ? 'is-selected' : ''}`}
            >
              <input
                type="checkbox"
                name="workDay-item"
                checked={toggleStates.workDays[option.value] || false}
                onChange={(e) => setToggleState('workDays', option.value, e.target.checked)}
                value={option.value}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ) : (
        // 목록에서 선택 탭일 때 기존 옵션들 렌더링
        <div className="FilterSection__buttons">
          {workDays.collection.map((option) => (
            <label
              key={option}
              className={`FilterSection__toggle-button ${toggleStates.workDays[option] ? 'is-selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={toggleStates.workDays[option] || false}
                onChange={(e) => setToggleState('workDays', option, e.target.checked)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      <Checkbox
        label="협의제외"
        checked={checkboxes.workDaysExclude}
        onChange={(checked) => setCheckbox('workDaysExclude', checked)}
      />
    </FilterSection>
  );
};
