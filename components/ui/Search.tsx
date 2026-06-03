'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';

type SearchSize = 'small' | 'medium' | 'large';

interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: SearchSize;
  onClear?: () => void;
}

const sizeClasses: Record<SearchSize, string> = {
  small: 'h-8 text-text2 px-3',
  medium: 'h-10 text-text2 px-4',
  large: 'h-12 text-text1 px-4',
};

const iconSizes: Record<SearchSize, number> = {
  small: 16,
  medium: 16,
  large: 20,
};

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ size = 'medium', value, onClear, onChange, className = '', ...props }, ref) => {
    const [internalValue, setInternalValue] = useState('');
    const currentValue = value ?? internalValue;
    const hasValue = String(currentValue).length > 0;
    const iconSize = iconSizes[size];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (value === undefined) setInternalValue('');
      onClear?.();
    };

    return (
      <div className={`relative flex items-center ${className}`}>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 20"
          fill="none"
          className="absolute left-3 text-icon pointer-events-none"
        >
          <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          ref={ref}
          type="text"
          value={currentValue}
          onChange={handleChange}
          className={`
            w-full bg-surface border border-border rounded-sm pl-9
            text-text-primary placeholder:text-placeholder
            focus:border-brand focus:ring-0 focus:outline-none
            transition-colors
            ${sizeClasses[size]}
          `}
          {...props}
        />
        {hasValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 p-1 text-icon hover:text-text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Search.displayName = 'Search';

export default Search;
