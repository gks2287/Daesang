'use client';

import { ReactNode } from 'react';

type BadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'dark';

interface BadgeProps {
  children: ReactNode;
  type?: BadgeType;
  className?: string;
}

const typeClasses: Record<BadgeType, string> = {
  primary: 'bg-brand-100 text-brand-700',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  dark: 'bg-gray-100 text-gray-800',
};

const Badge = ({ children, type = 'primary', className = '' }: BadgeProps) => {
  return (
    <span className={`
      inline-flex items-center px-2 py-0.5 rounded-full
      text-text3 font-medium
      ${typeClasses[type]} ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;
