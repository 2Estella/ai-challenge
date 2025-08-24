import React from 'react';
import type { FilterSectionProps } from '@/types';
import Counter from '@/components/Counter';
import './FilterSection.scss';

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  maxCount,
  currentCount = 0,
  hideCounter = false,
  children
}) => {
  return (
    <section className="FilterSection">
      <div className="FilterSection__header">
        <div className="FilterSection__title">{title}</div>
        {!hideCounter && maxCount && maxCount > 0 && (
          <Counter current={currentCount} max={maxCount} />
        )}
      </div>
      <div className="FilterSection__content">
        {children}
      </div>
    </section>
  );
};
