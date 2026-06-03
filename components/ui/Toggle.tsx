'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: 'small' | 'medium';
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, size = 'medium', checked, disabled, className = '', ...props }, ref) => {
    const trackSize = size === 'small' ? 'w-8 h-4' : 'w-10 h-5';
    const thumbSize = size === 'small' ? 'w-3 h-3' : 'w-4 h-4';
    const thumbTranslate = size === 'small' ? 'translate-x-4' : 'translate-x-5';

    return (
      <label className={`inline-flex items-center gap-2 cursor-pointer select-none ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}>
        <span className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <span className={`
            ${trackSize} rounded-full transition-colors
            peer-checked:bg-brand bg-border
          `} />
          <span className={`
            absolute left-0.5 ${thumbSize} rounded-full bg-white shadow-sm transition-transform
            peer-checked:${thumbTranslate}
          `} />
        </span>
        {label && <span className="text-text2 text-text-primary">{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
