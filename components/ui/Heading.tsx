'use client';

import { ReactNode, ElementType } from 'react';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface HeadingProps {
  type?: HeadingType;
  children: ReactNode;
  className?: string;
}

const typeClasses: Record<HeadingType, string> = {
  h1: 'text-h1 text-text-primary',
  h2: 'text-h2 text-text-primary',
  h3: 'text-h3 text-text-primary',
  h4: 'text-text1-medium text-text-primary',
  h5: 'text-text2-medium text-text-primary',
};

const Heading = ({ type = 'h2', children, className = '' }: HeadingProps) => {
  const Tag = type as ElementType;

  return (
    <Tag className={`font-sans ${typeClasses[type]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
