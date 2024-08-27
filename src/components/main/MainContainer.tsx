"use client"
import Calendar from './Calendar';

const MainContainer: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
      <Calendar />
      <div></div>
    </div>
  );
};

export default MainContainer;
