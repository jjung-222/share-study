"use client";
import Calendar from './Calendar';
import ScheduleList from './ScheduleList';

const MainContainer: React.FC = () => {
  const events = [
    { id: 1, title: '회의', date: '2024-09-23' },
    { id: 2, title: '프로젝트 마감', date: '2024-09-24' },
    { id: 3, title: '점심 약속', date: '2024-09-24' },
    { id: 4, title: '운동', date: '2024-09-25' },
  ];

  return (
    <div className="w-full h-full">
      <div className="bg-gray-100 border border-red-700 h-screen flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 h-screen">
          <div className="col-span-7 md:col-span-3 border border-blue-300 h-screen flex items-center justify-center"> 
            <Calendar />
          </div>
          <div className="col-span-7 md:col-span-2 border border-gray-300 flex flex-col h-screen"> 
          <div className="flex items-center justify-center mb-4">
            <div className="border border-gray-300 mx-4"></div>
            <p className="text-xl font-semibold">UPCOMING</p>
            <div className="flex justify-center mx-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
            <div className="flex-grow overflow-y-auto border border-gray-300 h-screen"> 
              <ScheduleList events={events} />
            </div>
          </div>
          <div className="col-span-7 md:col-span-2 border border-gray-300 h-screen">
            Div 3
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
