import React, { useState } from "react";

const DateCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getStartDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleMonthChange = (change) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + change)
    );
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDayOfMonth(year, month);
    const today = new Date().getDate();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    const reminderDays = [2, 16, 24];
    const importantDay = 22;

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today && month === thisMonth && year === thisYear;
      const isReminder = reminderDays.includes(day);
      const isImportant = day === importantDay;

      days.push(
        <div
          key={day}
          className={`w-10 h-10 flex items-center justify-center rounded-full 
                    ${
                      isToday ? "bg-blue-500 text-white" : "text-black"
                    } cursor-pointer`}
        >
          <span>{day}</span>
          {isReminder && <span className="text-red-500 ml-1">★</span>}
          {isImportant && <span className="text-yellow-400 ml-1">⚑</span>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="h-[380px]">
      <div className="flex justify-between items-center mb-4 bg-blue-50 border border-gray-200 rounded-md">
        <button
          onClick={() => handleMonthChange(-1)}
          className="px-2 py-1 text-lg"
        >
          {"<"}
        </button>
        <span className="text-lg font-semibold">
          {`${
            monthNames[currentDate.getMonth()]
          } năm ${currentDate.getFullYear()}`}
        </span>
        <button
          onClick={() => handleMonthChange(1)}
          className="px-2 py-1 text-lg"
        >
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-gray-500 mb-2">
        <div>H</div>
        <div>B</div>
        <div>T</div>
        <div>N</div>
        <div>S</div>
        <div>B</div>
        <div>CN</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default DateCalendar;
