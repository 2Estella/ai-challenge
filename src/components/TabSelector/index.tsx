import React from 'react';
import './TabSelector.scss';

interface TabSelectorProps {
  tabs: Array<{
    id: string;
    label: string;
    isSelected: boolean;
  }>;
  onTabChange: (tabId: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ tabs, onTabChange }) => {
  return (
    <div className="TabSelector">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`TabSelector__tab ${tab.isSelected ? 'is-selected' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
