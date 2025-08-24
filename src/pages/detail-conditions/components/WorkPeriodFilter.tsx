import React from 'react';
import { useSearchStore } from '@/stores/searchStore';
import { FilterSection } from '../FilterSection';

export const WorkPeriodFilter: React.FC = () => {
  const { conditions, toggleStates, setToggleState, getSelectedCount } = useSearchStore();

  if (!conditions) return null;

  const { workPeriod } = conditions;

  return (
    <FilterSection
      title={workPeriod.name}
      maxCount={workPeriod.maxCount || 6}
      currentCount={getSelectedCount('workPeriod')}
    >
      <div className="FilterSection__buttons">
        {workPeriod.collection.map((option) => (
          <label
            key={option}
            className={`FilterSection__toggle-button ${toggleStates.workPeriod[option] ? 'is-selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={toggleStates.workPeriod[option] || false}
              onChange={(e) => setToggleState('workPeriod', option, e.target.checked)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
};
