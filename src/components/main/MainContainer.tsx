"use client";
import React, { useState } from 'react';
import Calendar from './Calendar';
import ScheduleList from './ScheduleList';
import DailyExpenseList from './DailyExpenseList';

const MainContainer: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = [
    { id: 1, title: '회의', date: '2024-09-23' },
    { id: 2, title: '프로젝트 마감', date: '2024-09-24' },
    { id: 3, title: '점심 약속', date: '2024-09-24' },
    { id: 4, title: '운동', date: '2024-09-25' },
  ];

  const expenses = [
  { id: 1, title: "식사", amount: -10000, date: "2024-09-20" },
  { id: 2, title: "영화", amount: 12000, date: "2024-09-20" },
  { id: 3, title: "교통비", amount: -2000, date: "2024-09-21" },
  { id: 4, title: "상품구매", amount: 5000, date: "2024-09-21" },
];

  const [activeTab, setActiveTab] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <DailyExpenseList expenses={expenses} selectedDate={selectedDate} />;
      case 2:
        return <div>Weekly Content</div>;
      case 3:
        return <div>Monthly Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-gray-100 border border-red-700 h-screen flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 h-full">
          <div className="col-span-7 md:col-span-3 border border-blue-300 h-screen flex items-center justify-center">
            <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
          <div className="col-span-7 md:col-span-2 border border-gray-300 flex flex-col h-screen mb-4"> {/* Margin added here */}
            <div className="flex items-center justify-center mb-4">
              <div className="border border-gray-300 mx-4"></div>
              <p className="text-xl font-semibold">UPCOMING</p>
              <div className="flex justify-center mx-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto border border-gray-300">
              <ScheduleList events={events} selectedDate={selectedDate} />
            </div>
          </div>
          <div className="col-span-7 md:col-span-2 border border-gray-300 flex flex-col h-screen"> {/* Margin added here */}
            <div className="flex justify-between items-center bg-gray-100 border-b">
              <button
                className={`py-2 px-4 ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setActiveTab(1)}
              >
                Daily
              </button>
              <button
                className={`py-2 px-4 ${activeTab === 2 ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setActiveTab(2)}
              >
                Weekly
              </button>
              <button
                className={`py-2 px-4 ${activeTab === 3 ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setActiveTab(3)}
              >
                Monthly
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
