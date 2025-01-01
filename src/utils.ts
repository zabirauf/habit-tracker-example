import { HabitData, MonthData } from './types';

const STORAGE_KEY = 'habitData';

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getInitialMonthData = (): MonthData => ({});

export const getInitialYearData = (): HabitData[number] => {
  const data: HabitData[number] = {};
  for (let month = 0; month < 12; month++) {
    data[month] = getInitialMonthData();
  }
  return data;
};

export const loadData = (): HabitData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const saveData = (data: HabitData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const calculateMonthStreak = (monthData: MonthData, year: number, month: number): number => {
  const daysInMonth = getDaysInMonth(year, month);
  let maxStreak = 0;
  let currentStreak = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    if (monthData[day]) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
};

export const exportToMarkdown = (data: HabitData, year: number): string => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  let markdown = '| Day | ' + monthNames.join(' | ') + ' |\n';
  markdown += '|-----|' + '---|'.repeat(12) + '\n';

  const maxDays = Math.max(...monthNames.map((_, i) => getDaysInMonth(year, i)));

  for (let day = 1; day <= maxDays; day++) {
    markdown += `| ${day} |`;
    for (let month = 0; month < 12; month++) {
      const isValidDay = day <= getDaysInMonth(year, month);
      const isMarked = data[year]?.[month]?.[day];
      markdown += ` ${isValidDay ? (isMarked ? '✅' : ' ') : ' '} |`;
    }
    markdown += '\n';
  }

  return markdown;
};

export const downloadMarkdown = (content: string, year: number): void => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `habit-tracker-${year}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 