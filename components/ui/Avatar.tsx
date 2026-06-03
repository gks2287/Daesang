'use client';

type AvatarSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-text3',
  small: 'w-8 h-8 text-text3',
  medium: 'w-10 h-10 text-text2',
  large: 'w-12 h-12 text-text1',
  xl: 'w-16 h-16 text-h2',
};

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const Avatar = ({ src, name = '', size = 'medium', className = '' }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div className={`
      rounded-full flex items-center justify-center
      bg-brand-200 text-brand-700 font-semibold
      ${sizeClasses[size]} ${className}
    `}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
