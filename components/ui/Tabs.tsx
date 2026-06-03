'use client';

import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeClasses = {
  small: 'h-8 text-text2 px-3',
  medium: 'h-10 text-text2 px-4',
  large: 'h-12 text-text1 px-5',
};

const Tabs = ({ tabs, activeTab, defaultActiveTab, onChange, size = 'medium', className = '' }: TabsProps) => {
  const [internalActive, setInternalActive] = useState(defaultActiveTab || tabs[0]?.id);
  const currentActive = activeTab ?? internalActive;

  const handleClick = (tabId: string) => {
    if (activeTab === undefined) setInternalActive(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={`flex items-center border-b border-border ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === currentActive;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => handleClick(tab.id)}
            className={`
              relative flex items-center gap-2 font-sans
              transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed
              ${sizeClasses[size]}
              ${isActive ? 'text-brand' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
