'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

const RadioGroup = ({ name, value, defaultValue = '', onChange, disabled, children, className = '' }: RadioGroupProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const handleChange = (val: string) => {
    if (value === undefined) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name, disabled }}>
      <div role="radiogroup" className={`flex flex-col gap-4 ${className}`}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

interface RadioButtonProps {
  value: string;
  label?: string;
  disabled?: boolean;
}

const RadioButton = ({ value, label, disabled: itemDisabled }: RadioButtonProps) => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) return null;

  const isSelected = ctx.value === value;
  const isDisabled = ctx.disabled || itemDisabled;

  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer select-none ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      <span className="relative flex items-center justify-center">
        <input
          type="radio"
          name={ctx.name}
          value={value}
          checked={isSelected}
          disabled={isDisabled}
          onChange={() => ctx.onChange(value)}
          className="peer sr-only"
        />
        <span className={`
          w-4 h-4 rounded-full border-2 transition-colors
          ${isSelected ? 'border-brand' : 'border-border'}
        `}>
          {isSelected && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-brand" />
            </span>
          )}
        </span>
      </span>
      {label && <span className="text-text2 text-text-primary">{label}</span>}
    </label>
  );
};

export { RadioGroup, RadioButton };
export default RadioGroup;
