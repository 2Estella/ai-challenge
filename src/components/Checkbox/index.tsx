import React from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange
}) => {
  return (
    <label className="Checkbox">
      <input
        type="checkbox"
        className="Checkbox__input"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="Checkbox__label">{label}</span>
    </label>
  );
};

export default Checkbox;
