'use client';

type CounterSize = 'small' | 'large';
type CounterKind = 'fill' | 'outline' | 'line';
type CounterColor = 'primary' | 'dark' | 'light';

interface CounterProps {
  count: number;
  size?: CounterSize;
  kind?: CounterKind;
  color?: CounterColor;
  maxCount?: number;
  className?: string;
}

const Counter = ({ count, size = 'large', kind = 'fill', color = 'primary', maxCount = 99, className = '' }: CounterProps) => {
  const displayCount = count > maxCount ? `${maxCount}+` : String(count);

  const sizeClasses = size === 'small' ? 'min-w-[20px] h-5 px-1.5 text-text3' : 'min-w-[24px] h-6 px-2 text-text2';

  const colorClasses = {
    fill: {
      primary: 'bg-brand text-text-onBrand',
      dark: 'bg-text-primary text-text-onBrand',
      light: 'bg-surface-subtle text-text-primary',
    },
    outline: {
      primary: 'border border-brand text-brand',
      dark: 'border border-text-primary text-text-primary',
      light: 'border border-border text-text-secondary',
    },
    line: {
      primary: 'text-brand',
      dark: 'text-text-primary',
      light: 'text-text-secondary',
    },
  };

  return (
    <span className={`
      inline-flex items-center justify-center rounded-full font-sans
      ${sizeClasses}
      ${colorClasses[kind][color]}
      ${className}
    `}>
      {displayCount}
    </span>
  );
};

export default Counter;
