import React, { useEffect } from 'react';
import { useSearchStore } from '@/stores/searchStore';
import { FilterSection } from './FilterSection';
import { FilterButton } from './FilterButton';
import Checkbox from '@/components/Checkbox';
import Counter from '@/components/Counter';
import { WorkPeriodFilter } from './components/WorkPeriodFilter';
import { WorkDaysFilter } from './components/WorkDaysFilter';
import { WorkTimeFilter } from './components/WorkTimeFilter';
import { GenderFilter } from './components/GenderFilter';
import { EmploymentTypeFilter } from './components/EmploymentTypeFilter';
import './SearchConditionSettings.scss';

export const SearchConditionSettings: React.FC = () => {
  const {
    conditions,
    isLoading,
    error,
    checkboxes,
    setCheckbox,
    loadConditions,
    reset
  } = useSearchStore();

  useEffect(() => {
    loadConditions();
  }, [loadConditions]);

  if (isLoading) {
    return (
      <div className="SearchConditionSettings">
        <div className="SearchConditionSettings__loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="SearchConditionSettings">
        <div className="SearchConditionSettings__error">
          <p>데이터 로딩에 실패했습니다: {error}</p>
          <button onClick={loadConditions}>다시 시도</button>
        </div>
      </div>
    );
  }

  if (!conditions) {
    return null;
  }

  return (
    <div className="SearchConditionSettings">
      {/* Header */}
      <header className="SearchConditionSettings__header">
        <div className="SearchConditionSettings__header-container">
          <div className="SearchConditionSettings__header-control">
            <button className="SearchConditionSettings__back">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="SearchConditionSettings__header-base">
            <h1 className="SearchConditionSettings__title">검색조건설정</h1>
          </div>
          <div className="SearchConditionSettings__header-utils">
            <button className="SearchConditionSettings__reset" onClick={reset}>초기화</button>
          </div>
        </div>
      </header>

      {/* Intro Message */}
      <div className="SearchConditionSettings__intro">
        <p>모든 채용메뉴에 공통 반영됩니다.</p>
      </div>

      {/* Filter Sections */}
      <div className="SearchConditionSettings__content">
        {/* 근무지역 */}
        <FilterSection title="근무지역" maxCount={10} currentCount={0}>
          <FilterButton label="추가하기" variant="add" />
        </FilterSection>

        {/* 업직종 */}
        <FilterSection title="업직종" maxCount={10} currentCount={0}>
          <FilterButton label="추가하기" variant="add" />
        </FilterSection>

        {/* 데이터 기반 필터들 */}
        <WorkPeriodFilter />
        <WorkDaysFilter />
        <WorkTimeFilter />
        <GenderFilter />
        <EmploymentTypeFilter />

        {/* 연령 */}
        <FilterSection title="">
          <div className="FilterSection__age">
            <div className="FilterSection__age-header">
              <h3 className="FilterSection__age-title">연령</h3>
              <div className="FilterSection__age-info">
                <button className="FilterSection__age-info-button">
                  <span>만 나이 기준 안내</span>
                  <svg className="FilterSection__info-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" fill="#E5E5E5" stroke="none"/>
                    <path d="M10 6.5C10 5.5 10.5 5 11.5 5C12.5 5 13 5.5 13 6.5C13 7.5 12.5 8 11.5 8C11.5 8 11.5 8 11.5 8M11.5 10V11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-0.5, 0)"/>
                  </svg>
                </button>
              </div>
            </div>
            <select className="FilterSection__age-select">
              <option>연령선택</option>
            </select>
          </div>
          <Checkbox
            label="무관제외"
            checked={checkboxes.ageExclude}
            onChange={(checked) => setCheckbox('ageExclude', checked)}
          />
        </FilterSection>

        {/* 키워드 */}
        <FilterSection title="키워드">
          <p className="FilterSection__description">
            여러 개의 키워드를 포함하거나 제외할 수 있습니다.
          </p>

          <div className="FilterSection__keyword-section">
            <div className="FilterSection__keyword-header">
              <h4>포함</h4>
              <Counter current={0} max={20} />
            </div>
            <input
              type="text"
              placeholder="입력 단어 포함 공고만 검색합니다."
              className="FilterSection__keyword-input"
            />
          </div>

          <div className="FilterSection__keyword-section">
            <div className="FilterSection__keyword-header">
              <h4>제외</h4>
              <Counter current={0} max={100} />
            </div>
            <div className="FilterSection__keyword-exclude">
              <input
                type="text"
                placeholder="추가 단어 포함 공고를 제외합니다."
                className="FilterSection__keyword-input"
              />
              <button className="FilterSection__keyword-add">추가</button>
            </div>
          </div>
        </FilterSection>
      </div>

      {/* Footer */}
      <footer className="SearchConditionSettings__footer">
        <button className="SearchConditionSettings__submit">
          0 건의 결과보기
        </button>
      </footer>
    </div>
  );
};
