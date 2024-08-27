import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isToday, isSameDay } from 'date-fns';
import ArrowIcon from '../icons/ArrowIcon';

interface CalendarProps {
  initialDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(initialDate));

  // Get start and end of the month
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  // Get days to display
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth),
  });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ArrowIcon className="w-8 h-8 text-blue-500" />
        </button>
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <ArrowIcon className="w-8 h-8 text-blue-500 transform rotate-180" /> {/* 기본 방향 */}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-bold mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`py-2 text-center ${isToday(day) ? 'bg-blue-200 rounded-full' : ''} ${!isSameDay(day, startOfMonth(currentMonth)) && !isSameDay(day, endOfMonth(currentMonth)) ? 'text-gray-400' : ''}`}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
