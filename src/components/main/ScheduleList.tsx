import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns'; // date-fns가 import 되어있는지 확인하세요

interface Event {
  id: number;
  title: string;
  date: string; // 'YYYY-MM-DD' 형식
}

interface ScheduleListProps {
  events: Event[];
  selectedDate: Date | null; // Add this prop
}

const ScheduleList: React.FC<ScheduleListProps> = ({ events, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthYear, setMonthYear] = useState('');
  const [changeFlag, setChangeFlag] = useState(false);
  
  // Create a ref for each date row
  const dateRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  // Scroll to the selected date and update current month when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');

      // Update current month to match selected date
      setCurrentDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()));
      setChangeFlag(true)
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');

      const ref = dateRefs.current[dateString];
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setChangeFlag(false)
    }
  }, [changeFlag]);

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

    // Store the ref for each date
    const dateRef = React.createRef<HTMLDivElement>();
    useEffect(() => {
        dateRefs.current[dateString] = dateRef.current;
    }, [dateRef, dateString]);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 선택된 날짜와 비교하여 배경색 추가
    const isSelectedDate = selectedDate && format(selectedDate, 'yyyy-MM-dd') === dateString;
    const backgroundColor = isSelectedDate ? 'bg-blue-100' : ''; // 파란색 배경

    return (
        <div
            ref={dateRef} // Attach ref to the row
            id={`date-${dateString}`}
            className={`flex flex-col justify-start p-4 border-b ${backgroundColor} ${isSaturday ? 'text-gray-500' : isSunday ? 'text-red-500' : 'text-black'}`}
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
                {weekDays[day]}
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
