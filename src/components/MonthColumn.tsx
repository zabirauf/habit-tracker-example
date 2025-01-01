import * as React from 'react';
import { MonthData } from '../types';
import { calculateMonthStreak, getDaysInMonth } from '../utils';
import './MonthColumn.css';

interface MonthColumnProps {
  month: number;
  year: number;
  data: MonthData;
  onToggle: (day: number) => void;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthColumn: React.FC<MonthColumnProps> = ({
  month,
  year,
  data,
  onToggle,
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const streak = calculateMonthStreak(data, year, month);
  const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;

  return (
    <div className="flex flex-col min-w-[120px] p-4 border-r border-gray-200 last:border-r-0">
      <h3 className={`text-center font-bold mb-4 ${isCurrentMonth ? 'text-blue-600' : ''}`}>
        {monthNames[month]}
      </h3>
      <div className="flex-1 flex flex-col items-center gap-2">
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
          const isValidDay = day <= daysInMonth;
          const isMarked = data[day];

          return (
            <button
              key={day}
              className={`led ${isMarked ? 'led-on' : 'led-off'} ${!isValidDay ? 'opacity-0 cursor-default' : ''}`}
              onClick={() => isValidDay && onToggle(day)}
              disabled={!isValidDay}
              aria-label={`Toggle ${monthNames[month]} ${day}`}
            />
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">Streak</span>
        <div className="font-bold text-lg">{streak}</div>
      </div>
    </div>
  );
}; 