import React, { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string; // 'YYYY-MM-DD' 형식
}

interface ScheduleListProps {
  events: Event[];
}

const ScheduleList: React.FC<ScheduleListProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthYear, setMonthYear] = useState('');

  const getDateRange = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const dates = [];
    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      const dateString = new Date(year, month, day).toISOString().split('T')[0];
      dates.push(dateString);
    }
    return dates;
  };

  const [dateRange, setDateRange] = useState(getDateRange(currentDate));

  useEffect(() => {
    setDateRange(getDateRange(currentDate));
    setMonthYear(currentDate.toLocaleString('ko-KR', { year: 'numeric', month: 'long' }));
  }, [currentDate]);

  const groupedEvents = events.reduce((acc: { [key: string]: Event[] }, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  const Row = ({ date: dateString }: { date: string }) => {
    const day = new Date(dateString).getDay();
    const isSaturday = day === 6;
    const isSunday = day === 0;
  
    // 요일 약어 배열
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    return (
      <div
        id={`date-${dateString}`}
        className={`flex flex-col justify-start p-4 border-b ${isSaturday ? 'text-gray-500' : isSunday ? 'text-red-500' : 'text-black'}`}
      >
        <div className="flex justify-between items-center">
          <div className="w-2/5">{dateString.split('-')[2]}</div>
          <div className="w-3/5">
            {groupedEvents[dateString]?.map(event => (
              <div key={event.id} className="my-1">
                {event.title}
              </div>
            )) || <div className="my-1 text-gray-400">일정 없음</div>}
          </div>
        </div>
        <div className={`text-xs ${isSaturday ? 'text-gray-500' : isSunday ? 'text-red-500' : 'text-black'}`}>
          {weekDays[day]} {/* 요일 약어 추가 */}
        </div>
      </div>
    );
  };
  

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h2>{monthYear}</h2>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="overflow-y-auto flex-grow">
        {dateRange.map(date => (
          <Row key={date} date={date} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
