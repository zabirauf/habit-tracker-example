import { MonthData } from '../types';
import { calculateMonthStreak, getDaysInMonth } from '../utils';
import './MonthColumn.css';

export interface MonthColumnProps {
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
    <div className="flex flex-col min-w-[80px] p-2 border-r border-gray-700 last:border-r-0 led-column">
      <h3 className={`text-center text-sm mb-2 ${isCurrentMonth ? 'text-yellow-400' : 'text-gray-400'}`}>
        {monthNames[month].substring(0, 3).toLowerCase()}
      </h3>
      <div className="flex-1 flex flex-col items-center">
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
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-2 text-center streak-counter text-xs p-1">
        {streak}
      </div>
    </div>
  );
}; 