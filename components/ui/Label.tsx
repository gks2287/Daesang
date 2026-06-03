'use client';

type LabelColor = 'primary' | 'dark' | 'positive' | 'negative' | 'warning';
type LabelKind = 'fill' | 'outline' | 'line';
type LabelSize = 'small' | 'medium';

interface LabelProps {
  text: string;
  color?: LabelColor;
  kind?: LabelKind;
  size?: LabelSize;
  className?: string;
}

const fillColors: Record<LabelColor, string> = {
  primary: 'bg-brand text-text-onBrand',
  dark: 'bg-text-primary text-text-onBrand',
  positive: 'bg-status-success text-text-onBrand',
  negative: 'bg-status-error text-text-onBrand',
  warning: 'bg-status-warning text-text-primary',
};

const outlineColors: Record<LabelColor, string> = {
  primary: 'border border-brand text-brand',
  dark: 'border border-text-primary text-text-primary',
  positive: 'border border-status-success text-status-success',
  negative: 'border border-status-error text-status-error',
  warning: 'border border-status-warning text-yellow-700',
};

const lineColors: Record<LabelColor, string> = {
  primary: 'text-brand',
  dark: 'text-text-primary',
  positive: 'text-status-success',
  negative: 'text-status-error',
  warning: 'text-yellow-700',
};

const Label = ({ text, color = 'primary', kind = 'fill', size = 'medium', className = '' }: LabelProps) => {
  const sizeClasses = size === 'small' ? 'h-5 px-1 text-text3' : 'h-6 px-2 text-text2';

  const kindMap = { fill: fillColors, outline: outlineColors, line: lineColors };

  return (
    <span className={`
      inline-flex items-center justify-center rounded-sm font-sans
      ${sizeClasses}
      ${kindMap[kind][color]}
      ${className}
    `}>
      {text}
    </span>
  );
};

export default Label;
