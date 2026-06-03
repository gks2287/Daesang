'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate, checked, disabled, className = '', ...props }, ref) => {
    return (
      <label className={`inline-flex items-center gap-2 cursor-pointer select-none ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}>
        <span className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <span className={`
            w-4 h-4 rounded-[2px] border transition-colors
            peer-checked:bg-brand peer-checked:border-brand
            peer-indeterminate:bg-brand peer-indeterminate:border-brand
            ${!checked && !indeterminate ? 'bg-white border-border' : ''}
          `}>
            {checked && (
              <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
                <path d="M2.6 8.2L6.2 11.6L13.4 4.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {indeterminate && !checked && (
              <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
                <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </span>
        </span>
        {label && <span className="text-text2 text-text-primary">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
