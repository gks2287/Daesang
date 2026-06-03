'use client';

import { ReactNode } from 'react';

interface ListItem {
  id: string;
  label: string;
  icon?: ReactNode;
  rightContent?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

interface ListProps {
  items: ListItem[];
  className?: string;
}

const List = ({ items, className = '' }: ListProps) => {
  return (
    <div className={`flex flex-col ${className}`} role="listbox">
      {items.map((item) => (
        <button
          key={item.id}
          role="option"
          aria-selected={item.selected}
          disabled={item.disabled}
          onClick={item.onClick}
          className={`
            flex items-center gap-2 px-2 h-8 rounded-sm text-text2 text-left
            transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed
            ${item.selected ? 'bg-brand-50 text-brand' : 'text-text-primary hover:bg-surface-subtle'}
          `}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span className="flex-1 truncate">{item.label}</span>
          {item.rightContent && <span className="flex-shrink-0">{item.rightContent}</span>}
        </button>
      ))}
    </div>
  );
};

export default List;
