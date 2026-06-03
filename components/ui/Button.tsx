'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonKind = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'danger' | 'positive';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: ButtonKind;
  size?: ButtonSize;
  color?: ButtonColor;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  small: 'h-8 px-2 text-text2',
  medium: 'h-10 px-4 text-text2',
  large: 'h-12 px-6 text-text1',
};

const kindClasses: Record<ButtonKind, Record<ButtonColor, string>> = {
  primary: {
    primary: 'bg-brand text-text-onBrand hover:bg-brand-dark active:bg-brand-500',
    danger: 'bg-status-error text-text-onBrand hover:bg-red-700 active:bg-red-800',
    positive: 'bg-status-success text-text-onBrand hover:bg-green-700 active:bg-green-800',
  },
  secondary: {
    primary: 'border border-border text-text-primary hover:bg-surface-hover active:bg-surface-ui',
    danger: 'border border-status-error text-status-error hover:bg-red-50 active:bg-red-100',
    positive: 'border border-status-success text-status-success hover:bg-green-50 active:bg-green-100',
  },
  tertiary: {
    primary: 'text-text-primary hover:bg-surface-hover active:bg-surface-ui',
    danger: 'text-status-error hover:bg-red-50 active:bg-red-100',
    positive: 'text-status-success hover:bg-green-50 active:bg-green-100',
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ kind = 'primary', size = 'medium', color = 'primary', leftIcon, rightIcon, loading, disabled, children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 rounded-sm font-sans
          transition-colors duration-150
          disabled:opacity-40 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${kindClasses[kind][color]}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        {children && <span>{children}</span>}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
