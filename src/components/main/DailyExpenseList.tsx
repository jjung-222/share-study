import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import {MarkComma} from '../../../src/utils/CommonFunc'

interface Event {
  id: number;
  title: string;
  amount: number;
  date: string; // 'YYYY-MM-DD' 형식
}

interface ScheduleListProps {
  expenses: Event[];
  selectedDate: Date | null; // Add this prop
}

const DailyExpenseList: React.FC<ScheduleListProps> = ({ expenses, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthYear, setMonthYear] = useState('');
  const [changeFlag, setChangeFlag] = useState(false);
  
  const expenseDateRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      setCurrentDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth()));
      setChangeFlag(true);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      const ref = expenseDateRefs.current[dateString];
      if (ref) {
        setTimeout(() => {
          ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);
      }
      setChangeFlag(false);
    }
  }, [changeFlag]);

  const groupedEvents = expenses.reduce((acc: { [key: string]: Event[] }, event) => {
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

    const expenseDateRef = React.createRef<HTMLDivElement>();
    useEffect(() => {
        expenseDateRefs.current[dateString] = expenseDateRef.current;
    }, [expenseDateRef, dateString]);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 선택된 날짜와 비교하여 배경색 추가
    const isSelectedDate = selectedDate && format(selectedDate, 'yyyy-MM-dd') === dateString;
    const backgroundColor = isSelectedDate ? 'bg-blue-100' : ''; // 파란색 배경

    return (
        <div
            ref={expenseDateRef}
            id={`date-${dateString}`}
            className={`flex flex-col p-3 border-b ${backgroundColor} ${isSaturday ? 'text-gray-500' : isSunday ? 'text-red-500' : 'text-black'}`}
        >
            <div className="flex justify-between items-center">
                {/* 날짜 영역 */}
                <div className="w-1/5 text-left">{dateString.split('-')[2]}</div>

                <div className="w-4/5 flex flex-col">
                    {groupedEvents[dateString]?.map(expense => (
                        <div key={expense.id} className="flex justify-between items-center">
                            {/* 음수 amount (지출) */}
                            {expense.amount < 0 ?
                                <div className="w-1/3 text-left">
                                    {MarkComma(expense.amount)} 원 {/* 음수 amount 표시 */}
                                </div> :
                                <div className="w-1/3 text-left"></div>
                            }
                            {/* 제목 영역 */}
                            <div className="w-1/3 text-center">
                                {expense.title}
                            </div>
                            {/* 양수 amount (수입) */}
                            {expense.amount > 0 ?
                                <div className="w-1/3 text-right">
                                    +{MarkComma(expense.amount)} 원 {/* 양수 amount 표시 */}
                                </div> :
                                <div className="w-1/3 text-right"></div> 
                            }
                        </div>
                    )) || <div className="my-1 text-gray-400 text-center">변동 없음</div>}
                </div>
            </div>

            {/* 요일 표시 */}
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

export default DailyExpenseList;
