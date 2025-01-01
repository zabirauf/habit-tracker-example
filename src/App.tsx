import { useEffect, useRef, useState } from 'react';
import { MonthColumn } from './components/MonthColumn';
import { HabitData } from './types';
import {
  loadData,
  saveData,
  getInitialYearData,
  exportToMarkdown,
  downloadMarkdown
} from './utils';

function App() {
  const [data, setData] = useState<HabitData>({});
  const [year] = useState(() => new Date().getFullYear());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadedData = loadData();
    if (!loadedData[year]) {
      loadedData[year] = getInitialYearData();
    }
    setData(loadedData);
  }, [year]);

  useEffect(() => {
    // Center current month on load
    const currentMonth = new Date().getMonth();
    const columnWidth = 120; // matches min-w-[120px] in MonthColumn
    const padding = 16; // matches p-4 in MonthColumn
    const totalWidth = columnWidth + (padding * 2);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = (currentMonth * totalWidth) - 
        (scrollContainerRef.current.clientWidth / 2) + (totalWidth / 2);
    }
  }, []);

  const handleToggle = (month: number, day: number) => {
    setData((prev) => {
      const newData = { ...prev };
      if (!newData[year][month][day]) {
        newData[year][month][day] = true;
      } else {
        delete newData[year][month][day];
      }
      saveData(newData);
      return newData;
    });
  };

  const handleExport = () => {
    const markdown = exportToMarkdown(data, year);
    downloadMarkdown(markdown, year);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the year? This will clear all data.')) {
      const shouldExport = window.confirm('Would you like to export the data before resetting?');
      if (shouldExport) {
        handleExport();
      }
      const newData = { ...data };
      newData[year] = getInitialYearData();
      setData(newData);
      saveData(newData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Habit Tracker {year}</h1>
          <div className="space-x-4">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Export
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Reset Year
            </button>
          </div>
        </header>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 -mx-4 px-4"
        >
          <div className="flex w-max">
            {Array.from({ length: 12 }, (_, month) => (
              <MonthColumn
                key={month}
                month={month}
                year={year}
                data={data[year]?.[month] || {}}
                onToggle={(day) => handleToggle(month, day)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
