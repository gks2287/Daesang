'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonKind = 'primary' | 'secondary' | 'tertiary';
type IconButtonSize = 'xs' | 'small' | 'medium' | 'large';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  kind?: IconButtonKind;
  size?: IconButtonSize;
  'aria-label': string;
}

const sizeClasses: Record<IconButtonSize, string> = {
  xs: 'w-6 h-6',
  small: 'w-8 h-8',
  medium: 'w-10 h-10',
  large: 'w-12 h-12',
};

const kindClasses: Record<IconButtonKind, string> = {
  primary: 'bg-brand text-text-onBrand hover:bg-brand-dark active:bg-brand-500',
  secondary: 'border border-border text-text-primary hover:bg-surface-subtle active:bg-surface-disabled',
  tertiary: 'text-icon hover:bg-surface-hover active:bg-surface-ui',
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, kind = 'tertiary', size = 'medium', disabled, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center rounded-sm
          transition-colors duration-150
          disabled:opacity-40 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${kindClasses[kind]}
          ${className}
        `}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
