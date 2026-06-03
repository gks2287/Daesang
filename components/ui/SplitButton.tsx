'use client';

import { useState, useRef, useEffect, ReactNode, ButtonHTMLAttributes } from 'react';

type SplitButtonSize = 'small' | 'medium' | 'large';

interface SplitButtonProps {
  children: ReactNode;
  size?: SplitButtonSize;
  menuItems?: { label: string; onClick: () => void }[];
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const sizeClasses: Record<SplitButtonSize, string> = {
  small: 'h-8 text-text2',
  medium: 'h-10 text-text2',
  large: 'h-12 text-text1',
};

const SplitButton = ({ children, size = 'small', menuItems = [], onClick, disabled, className = '' }: SplitButtonProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`
          inline-flex items-center gap-2 px-2 bg-brand text-text-onBrand
          rounded-l-sm hover:bg-brand-dark transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed
          ${sizeClasses[size]}
        `}
      >
        {children}
      </button>
      <button
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`
          inline-flex items-center justify-center w-6 bg-brand text-text-onBrand
          border-l border-brand-dark rounded-r-sm hover:bg-brand-dark transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed
          ${sizeClasses[size]}
        `}
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && menuItems.length > 0 && (
        <div className="absolute top-full left-0 mt-1 min-w-full bg-surface border border-border rounded-md shadow-md z-50">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => { item.onClick(); setOpen(false); }}
              className="block w-full text-left px-4 py-2 text-text2 text-text-primary hover:bg-surface-subtle transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SplitButton;
