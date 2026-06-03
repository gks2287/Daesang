'use client';

import { ReactNode } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-text-secondary">
    <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="flex items-center gap-1 px-1 py-0.5 rounded-sm hover:bg-surface-subtle transition-colors cursor-pointer">
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            {item.href ? (
              <a href={item.href} className="text-text2 text-text-secondary hover:text-text-primary transition-colors">
                {item.label}
              </a>
            ) : (
              <button onClick={item.onClick} className="text-text2 text-text-secondary hover:text-text-primary transition-colors">
                {item.label}
              </button>
            )}
          </div>
          {index < items.length - 1 && (
            <span className="mx-0.5">
              <ChevronIcon />
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
