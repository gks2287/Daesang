'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

type TextFieldSize = 'small' | 'medium' | 'large';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: TextFieldSize;
  error?: string;
  success?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const sizeClasses: Record<TextFieldSize, string> = {
  small: 'h-8 text-text2 px-3',
  medium: 'h-10 text-text2 px-4',
  large: 'h-12 text-text1 px-4',
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, size = 'medium', error, success, leftIcon, rightIcon, disabled, className = '', ...props }, ref) => {
    const borderColor = error ? 'border-status-error focus:border-status-error' : success ? 'border-status-success focus:border-status-success' : 'border-border focus:border-brand';

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label && <label className="text-text2-medium text-text-primary">{label}</label>}
        <div className="relative flex items-center">
          {leftIcon && <span className="absolute left-3 text-icon pointer-events-none">{leftIcon}</span>}
          <input
            ref={ref}
            disabled={disabled}
            className={`
              w-full bg-surface border rounded-sm
              text-text-primary placeholder:text-placeholder
              focus:ring-0 focus:outline-none transition-colors
              disabled:bg-surface-disabled disabled:text-text-disabled disabled:cursor-not-allowed
              ${sizeClasses[size]}
              ${borderColor}
              ${leftIcon ? 'pl-9' : ''}
              ${rightIcon ? 'pr-9' : ''}
            `}
            {...props}
          />
          {rightIcon && <span className="absolute right-3 text-icon">{rightIcon}</span>}
        </div>
        {error && <span className="text-text3 text-status-error">{error}</span>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
