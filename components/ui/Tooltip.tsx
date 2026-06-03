'use client';

import { useState, useRef, ReactNode } from 'react';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children: ReactNode;
  className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const Tooltip = ({ content, position = 'top', children, className = '' }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={`
          absolute z-50 px-3 py-1.5 rounded-md
          bg-text-primary text-white text-text3
          whitespace-nowrap pointer-events-none
          shadow-sm
          ${positionClasses[position]}
        `}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
