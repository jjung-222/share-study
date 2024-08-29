import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isToday, isSameDay } from 'date-fns';
import ArrowIcon from '../icons/ArrowIcon';

interface CalendarProps {
  initialDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(initialDate));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get start and end of the month
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  // Get start and end of the week for display
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth),
  });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Function to determine if a day is in the current month
  const isInCurrentMonth = (day: Date) => day >= firstDayOfMonth && day <= lastDayOfMonth;

  // Function to get the class name for each day
  const getDayClassName = (day: Date) => {
    const baseClass = 'relative flex items-center justify-center';
    // const todayClass = isToday(day) ? 'bg-pink-600 text-white rounded-full' : '';
    // const selectedClass = isSameDay(day, selectedDate) ? 'bg-blue-500 text-white rounded-full' : '';
    const monthClass = isInCurrentMonth(day) ? 'text-black' : 'text-gray-400';
    return `${baseClass} ${monthClass}`;
  };

  return (
    <div className="bg-white max-w-xl mx-auto mt-5 p-4 border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4 h-[60px]">
        <button onClick={handlePrevMonth} className="bg-white w-12 h-12 p-1 bg-gray-200 rounded-full hover:border border-blue-300">
          <ArrowIcon className="bg-white w-7 h-7 text-blue-500"  style={{marginLeft:"5px"}}/>
        </button>
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="bg-white w-12 h-12 p-1 bg-gray-200 rounded-full hover:border border-blue-300">
          <ArrowIcon className="bg-white w-7 h-7 text-blue-500 transform rotate-180" style={{marginLeft:"5px"}}/>
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
            className="w-20 h-20 flex flex-col items-center justify-center"
          >
            <div className={`flex flex-col w-full h-full ${getDayClassName(day)}`}>
              <div className={`${isToday(day) && "bg-white"} text-gray-500 text-xs rounded-md px-1 flex-shrink-0 flex items-center justify-center`} style={{ height: '20%' }}>
                {isToday(day) ? "TODAY" : "" }
              </div>
              <div
                className={`flex-1 flex items-center justify-center ${getDayClassName(day)}`}
                onClick={() => setSelectedDate(day)}
              >
                <div className={`w-12 h-12 flex items-center justify-center ${isToday(day) ? 'bg-pink-600 text-white rounded-full' : ''} ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white rounded-full' : ''} rounded-full ${isToday(day) || isSameDay(day, selectedDate) &&"border border-gray-300"}`}>
                  <span className="text-lg">{day.getDate()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
