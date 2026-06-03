'use client';

import { useState, ReactNode } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

const Accordion = ({ items, allowMultiple = false, defaultOpen = [], className = '' }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
    } else {
      setOpenItems((prev) => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className={`divide-y divide-border ${className}`}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <div key={item.id}>
            <button
              onClick={() => !item.disabled && toggle(item.id)}
              disabled={item.disabled}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-left
                transition-colors hover:bg-surface-hover
                disabled:opacity-40 disabled:cursor-not-allowed
                ${isFirst ? 'rounded-t-md' : ''}
                ${isLast && !isOpen ? 'rounded-b-md' : ''}
              `}
            >
              <svg
                className={`w-3.5 h-3.5 text-icon transition-transform flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`}
                viewBox="0 0 14 14"
                fill="none"
              >
                <path d="M3.5 1.4L10.5 7L3.5 12.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item.icon && <span className="flex-shrink-0 text-text-secondary">{item.icon}</span>}
              <span className="text-text2-medium text-text-primary">{item.title}</span>
            </button>
            {isOpen && (
              <div className={`px-4 pb-4 pl-10 text-text2 text-text-secondary ${isLast ? 'rounded-b-md' : ''}`}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
