'use client';

type LoaderSize = 'xs' | 'small' | 'medium' | 'large';
type LoaderColor = 'primary' | 'dark' | 'onColor';

interface LoaderProps {
  size?: LoaderSize;
  color?: LoaderColor;
  className?: string;
}

const sizeMap: Record<LoaderSize, number> = {
  xs: 16,
  small: 24,
  medium: 40,
  large: 64,
};

const colorMap: Record<LoaderColor, string> = {
  primary: 'text-brand',
  dark: 'text-text-primary',
  onColor: 'text-white',
};

const Loader = ({ size = 'medium', color = 'primary', className = '' }: LoaderProps) => {
  const s = sizeMap[size];
  const strokeWidth = size === 'xs' ? 3 : size === 'small' ? 3 : 2.5;

  return (
    <div className={`inline-flex items-center justify-center ${colorMap[color]} ${className}`} role="status" aria-label="Loading">
      <svg width={s} height={s} viewBox="0 0 40 40" className="animate-spin">
        <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="0.2" />
        <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray="80" strokeDashoffset="60" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Loader;
