import React from 'react';
import './FilterButton.scss';

interface FilterButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'add';
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isSelected = false,
  onClick,
  variant = 'default'
}) => {
  return (
    <button
      className={`FilterButton FilterButton--${variant} ${isSelected ? 'is-selected' : ''}`}
      onClick={onClick}
    >
      <span className="FilterButton__label">{label}</span>
    </button>
  );
};
