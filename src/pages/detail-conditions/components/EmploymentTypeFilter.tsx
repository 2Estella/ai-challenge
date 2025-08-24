import React from 'react';
import { useSearchStore } from '@/stores/searchStore';
import { FilterSection } from '../FilterSection';

export const EmploymentTypeFilter: React.FC = () => {
  const { conditions, toggleStates, setToggleState, getSelectedCount } = useSearchStore();

  if (!conditions) return null;

  const { employmentType } = conditions;

  return (
    <FilterSection
      title={employmentType.name}
      maxCount={employmentType.maxCount || 7}
      currentCount={getSelectedCount('employmentType')}
    >
      <div className="FilterSection__buttons">
        {employmentType.collection.map((option) => (
          <label
            key={option}
            className={`FilterSection__toggle-button ${toggleStates.employmentType[option] ? 'is-selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={toggleStates.employmentType[option] || false}
              onChange={(e) => setToggleState('employmentType', option, e.target.checked)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
};
