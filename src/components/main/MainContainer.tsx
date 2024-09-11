"use client";
import Calendar from './Calendar';

const MainContainer: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">My Calendar</h1>
      <div className="container bg-gray-100 border border-gray-700 mb-4">
        {/* 큰 div 안의 가로로 3개의 div */}
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
          <div className="border border-gray-300 p-4">
            <Calendar />
          </div>
          <div className="flex flex-col items-center flex justify-between border border-gray-300 p-0 text-center ">
            <div className='grid grid-cols-3 flex items-center justify-center' style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div className="border border-gray-300"></div>
            <div className="border border-gray-300 text-center"><p className="text-xl font-semibold flex-grow-0 flex-shrink-0">UPCOMING</p></div>
            <div className="border border-gray-300 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            </div>
            <div className="container p-4 flex-grow border border-gray-300">
              <p>Content</p>
            </div>
          </div>
          <div className="border border-gray-300 p-4">
            Div 3
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MainContainer;
