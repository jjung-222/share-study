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
          <div className="flex flex-col items-center justify-between border border-gray-300 p-4 text-center">
            <p className="text-xl font-semibold mb-2 flex-grow-0 flex-shrink-0">UPCOMING</p>
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
