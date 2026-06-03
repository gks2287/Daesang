'use client';

import { ReactNode } from 'react';

type ToastType = 'primary' | 'success' | 'warning' | 'danger';

interface ToastProps {
  type?: ToastType;
  message: string;
  icon?: ReactNode;
  link?: { label: string; href: string };
  action?: { label: string; onClick: () => void };
  onClose?: () => void;
  className?: string;
}

const typeClasses: Record<ToastType, string> = {
  primary: 'bg-brand',
  success: 'bg-status-success',
  warning: 'bg-status-warning text-text-primary',
  danger: 'bg-status-error',
};

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="6.5" r="1" fill="currentColor"/>
  </svg>
);

const Toast = ({ type = 'primary', message, icon, link, action, onClose, className = '' }: ToastProps) => {
  const textColor = type === 'warning' ? 'text-text-primary' : 'text-white';

  return (
    <div className={`
      inline-flex items-center gap-6 h-12 px-4 rounded-sm shadow-md
      ${typeClasses[type]} ${textColor} ${className}
    `}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {icon !== undefined ? icon : <InfoIcon />}
          <span className="text-text2">{message}</span>
        </div>
        {link && (
          <a href={link.href} className="text-text2 underline hover:opacity-80 transition-opacity">
            {link.label}
          </a>
        )}
      </div>
      <div className="flex items-center gap-4">
        {action && (
          <button
            onClick={action.onClick}
            className={`h-8 px-2 text-text2 border rounded-sm transition-colors hover:bg-white/10 ${type === 'warning' ? 'border-text-primary' : 'border-white'}`}
          >
            {action.label}
          </button>
        )}
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-sm transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
