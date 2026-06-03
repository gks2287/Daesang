'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

type DropdownSize = 'small' | 'medium' | 'large';

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: DropdownSize;
  onChange?: (value: string) => void;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
}

const sizeClasses: Record<DropdownSize, string> = {
  small: 'h-8 text-text2',
  medium: 'h-10 text-text2',
  large: 'h-12 text-text2',
};

const Dropdown = ({ options, value, defaultValue, placeholder = 'Placeholder text here', size = 'large', onChange, disabled, icon, className = '' }: DropdownProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentValue = value ?? internalValue;
  const selectedOption = options.find((o) => o.value === currentValue);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (val: string) => {
    if (value === undefined) setInternalValue(val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`
          w-full flex items-center gap-2 px-4 pr-1 bg-surface border border-border rounded-sm
          text-left transition-colors
          hover:border-text-secondary focus:border-brand
          disabled:opacity-40 disabled:cursor-not-allowed
          ${sizeClasses[size]}
        `}
      >
        {icon && <span className="flex-shrink-0 text-text-secondary">{icon}</span>}
        <span className={`flex-1 truncate ${selectedOption ? 'text-text-primary' : 'text-placeholder'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-icon">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-md z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full flex items-center gap-2 px-4 py-2 text-text2 text-left transition-colors
                hover:bg-surface-hover
                ${option.value === currentValue ? 'bg-brand-50 text-brand' : 'text-text-primary'}
              `}
            >
              {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
