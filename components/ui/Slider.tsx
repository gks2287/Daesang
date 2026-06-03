'use client';

import { useState, useRef, useCallback } from 'react';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  rangeValue?: [number, number];
  defaultRangeValue?: [number, number];
  onChange?: (value: number) => void;
  onRangeChange?: (value: [number, number]) => void;
  disabled?: boolean;
  className?: string;
}

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  rangeValue,
  defaultRangeValue,
  onChange,
  onRangeChange,
  disabled,
  className = '',
}: SliderProps) => {
  const isRange = rangeValue !== undefined || defaultRangeValue !== undefined;
  const [singleVal, setSingleVal] = useState(defaultValue);
  const [rangeVal, setRangeVal] = useState<[number, number]>(defaultRangeValue || [30, 70]);

  const currentSingle = value ?? singleVal;
  const currentRange = rangeValue ?? rangeVal;

  const trackRef = useRef<HTMLDivElement>(null);

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (value === undefined) setSingleVal(v);
    onChange?.(v);
  };

  if (isRange) {
    const leftPercent = getPercent(currentRange[0]);
    const rightPercent = getPercent(currentRange[1]);

    return (
      <div className={`relative w-full h-6 flex items-center ${disabled ? 'opacity-40' : ''} ${className}`}>
        <div ref={trackRef} className="absolute w-full h-1.5 rounded-full bg-brand-100" />
        <div
          className="absolute h-1.5 bg-brand rounded-full"
          style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentRange[0]}
          disabled={disabled}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), currentRange[1] - step);
            const next: [number, number] = [v, currentRange[1]];
            if (rangeValue === undefined) setRangeVal(next);
            onRangeChange?.(next);
          }}
          className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentRange[1]}
          disabled={disabled}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), currentRange[0] + step);
            const next: [number, number] = [currentRange[0], v];
            if (rangeValue === undefined) setRangeVal(next);
            onRangeChange?.(next);
          }}
          className="absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    );
  }

  const percent = getPercent(currentSingle);

  return (
    <div className={`relative w-full h-6 flex items-center ${disabled ? 'opacity-40' : ''} ${className}`}>
      <div className="absolute w-full h-1.5 rounded-full bg-brand-100" />
      <div className="absolute h-1.5 bg-brand rounded-l-full" style={{ width: `${percent}%` }} />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentSingle}
        disabled={disabled}
        onChange={handleSingleChange}
        className="absolute w-full h-6 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer"
      />
    </div>
  );
};

export default Slider;
