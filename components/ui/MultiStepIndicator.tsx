'use client';

import { ReactNode } from 'react';

type StepStatus = 'fulfilled' | 'active' | 'pending';

interface Step {
  title: string;
  subtitle?: string;
  status: StepStatus;
}

interface MultiStepIndicatorProps {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path d="M4 10L8.5 14.5L16 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StepCircle = ({ step, index }: { step: Step; index: number }) => {
  const baseClasses = 'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0';

  if (step.status === 'fulfilled') {
    return (
      <div className={`${baseClasses} bg-brand text-white`}>
        <CheckIcon />
      </div>
    );
  }

  if (step.status === 'active') {
    return (
      <div className={`${baseClasses} bg-white border-2 border-brand`}>
        <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white text-text2">
          {index + 1}
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} bg-white border-2 border-border`}>
      <span className="text-text2 text-text-primary">{index + 1}</span>
    </div>
  );
};

const MultiStepIndicator = ({ steps, orientation = 'horizontal', className = '' }: MultiStepIndicatorProps) => {
  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <StepCircle step={step} index={i} />
              {i < steps.length - 1 && <div className="w-0.5 flex-1 min-h-[24px] bg-border my-2" />}
            </div>
            <div className="flex flex-col gap-0.5 pt-3">
              <span className="text-text2-medium text-text-primary">{step.title}</span>
              {step.subtitle && <span className="text-text2 text-text-secondary">{step.subtitle}</span>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-start ${className}`}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-start flex-1">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center w-full">
              {i > 0 && <div className="flex-1 h-0.5 bg-border" />}
              <StepCircle step={step} index={i} />
              {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-border" />}
            </div>
            <div className="flex flex-col items-center gap-0.5 text-center">
              <span className="text-text2-medium text-text-primary">{step.title}</span>
              {step.subtitle && <span className="text-text2 text-text-secondary max-w-[124px]">{step.subtitle}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiStepIndicator;
