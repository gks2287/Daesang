'use client';

import { useState } from 'react';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DatePicker = ({ value, onChange, className = '' }: DatePickerProps) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value || today);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday start
  const daysInMonth = lastDay.getDate();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  for (let i = 0; i < startOffset; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const isToday = (day: number) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
  };

  const handleSelect = (day: number) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    onChange?.(date);
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div className={`inline-block bg-surface rounded-md shadow-md border border-transparent p-5 ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="w-6 h-6 flex items-center justify-center text-text-secondary hover:bg-surface-subtle rounded-sm transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="flex items-center gap-1 text-[18px] text-text-primary hover:bg-surface-subtle px-2 py-0.5 rounded-sm transition-colors">
          {MONTHS[month]} {year}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={nextMonth} className="w-6 h-6 flex items-center justify-center text-text-secondary hover:bg-surface-subtle rounded-sm transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className="w-10 h-6 flex items-center justify-center text-text3 text-text-secondary">
            {day}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-0.5">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7">
            {week.map((day, di) => (
              <div key={di} className="w-10 h-10 flex items-center justify-center">
                {day !== null ? (
                  <button
                    onClick={() => handleSelect(day)}
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-full text-text1 transition-colors
                      ${isSelected(day) ? 'bg-brand text-white' : ''}
                      ${isToday(day) && !isSelected(day) ? 'border border-brand text-text-primary' : ''}
                      ${!isSelected(day) && !isToday(day) ? 'text-text-primary hover:bg-surface-subtle' : ''}
                    `}
                  >
                    {day}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
