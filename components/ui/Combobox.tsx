'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface ComboboxOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  disabled?: boolean;
  className?: string;
}

const Combobox = ({ options, value, placeholder = 'Placeholder text here', onChange, onSearch, disabled, className = '' }: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (val: string) => {
    onChange?.(val);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className={`
          w-60 bg-surface border border-transparent rounded-md shadow-md
          flex flex-col gap-2 p-2
          ${disabled ? 'opacity-40 pointer-events-none' : ''}
        `}
      >
        <div className="flex items-center gap-2 px-4 h-8 border border-border rounded-sm">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 text-text-secondary">
            <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-text2 text-text-primary placeholder:text-text-secondary outline-none"
          />
        </div>
        {open && (
          <div className="flex flex-col max-h-60 overflow-y-auto">
            {filtered.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  flex items-center gap-2 px-2 h-8 rounded-sm text-text2 text-left transition-colors
                  hover:bg-surface-subtle
                  ${option.value === value ? 'bg-brand-50 text-brand' : 'text-text-primary'}
                `}
              >
                {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                {option.label}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-2 py-4 text-text2 text-text-secondary text-center">No results</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Combobox;
