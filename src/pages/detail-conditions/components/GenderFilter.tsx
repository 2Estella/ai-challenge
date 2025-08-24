import React from 'react';
import { useSearchStore } from '@/stores/searchStore';
import { FilterSection } from '../FilterSection';
import TabSelector from '@/components/TabSelector';
import Checkbox from '@/components/Checkbox';

export const GenderFilter: React.FC = () => {
  const { conditions, toggleStates, checkboxes, setToggleState, setCheckbox } = useSearchStore();

  if (!conditions) return null;

  const { gender } = conditions;

  // 선택된 성별 확인
  const selectedGender = Object.keys(toggleStates.gender).find(key => toggleStates.gender[key]) || '';

  return (
    <FilterSection title={gender.name}>
      <TabSelector
        tabs={[
          { id: '남성', label: '남성', isSelected: selectedGender === '남성' },
          { id: '여성', label: '여성', isSelected: selectedGender === '여성' }
        ]}
        onTabChange={(tabId) => {
          // 기존 선택 해제
          Object.keys(toggleStates.gender).forEach(key => {
            setToggleState('gender', key, false);
          });
          // 새로 선택
          setToggleState('gender', tabId, true);
        }}
      />
      <Checkbox
        label="무관제외"
        checked={checkboxes.genderExclude}
        onChange={(checked) => setCheckbox('genderExclude', checked)}
      />
    </FilterSection>
  );
};
