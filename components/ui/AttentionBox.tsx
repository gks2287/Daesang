'use client';

import { ReactNode } from 'react';

type AttentionBoxType = 'primary' | 'success' | 'warning' | 'danger';

interface AttentionBoxProps {
  type?: AttentionBoxType;
  title?: string;
  text: string;
  icon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
  link?: { label: string; href: string };
  className?: string;
}

const typeStyles: Record<AttentionBoxType, { bg: string; icon: string }> = {
  primary: { bg: 'bg-brand-100', icon: 'text-brand' },
  success: { bg: 'bg-green-50', icon: 'text-status-success' },
  warning: { bg: 'bg-yellow-50', icon: 'text-yellow-600' },
  danger: { bg: 'bg-red-50', icon: 'text-status-error' },
};

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 9V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="6.5" r="1" fill="currentColor"/>
  </svg>
);

const AttentionBox = ({ type = 'primary', title, text, icon = true, dismissible, onDismiss, action, link, className = '' }: AttentionBoxProps) => {
  const styles = typeStyles[type];

  return (
    <div className={`flex gap-3 p-3 px-4 rounded-md ${styles.bg} ${className}`}>
      {icon && (
        <div className={`flex-shrink-0 pt-0.5 ${styles.icon}`}>
          <InfoIcon />
        </div>
      )}
      <div className="flex-1 flex flex-col gap-1">
        {title && <p className="text-text2-medium text-text-primary">{title}</p>}
        <p className="text-text2 text-text-primary">{text}</p>
        {(action || link) && (
          <div className="flex items-center gap-4 mt-2">
            {action && (
              <button onClick={action.onClick} className="text-text2-medium text-brand hover:text-brand-dark transition-colors">
                {action.label}
              </button>
            )}
            {link && (
              <a href={link.href} className="text-text2 text-brand underline hover:text-brand-dark transition-colors">
                {link.label}
              </a>
            )}
          </div>
        )}
      </div>
      {dismissible && (
        <button onClick={onDismiss} className="flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default AttentionBox;
