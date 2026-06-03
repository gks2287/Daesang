'use client';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Divider = ({ orientation = 'horizontal', className = '' }: DividerProps) => {
  if (orientation === 'vertical') {
    return <div className={`w-px self-stretch bg-border-light ${className}`} />;
  }
  return <hr className={`w-full border-0 h-px bg-border-light ${className}`} />;
};

export default Divider;
