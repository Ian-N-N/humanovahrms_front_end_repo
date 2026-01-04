import React, { useState, useEffect } from 'react';

const SystemDateTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update the state every second
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Cleanup the interval when component unmounts to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  // Format options: e.g., "Wed, Oct 25, 2023 • 10:30 AM"
  const dateOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  const timeOptions = { 
    hour: '2-digit', 
    minute: '2-digit',
    // second: '2-digit', // Uncomment if you want seconds
    hour12: true 
  };

  const dateString = currentDate.toLocaleDateString('en-US', dateOptions);
  const timeString = currentDate.toLocaleTimeString('en-US', timeOptions);

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm">
      {/* Calendar Icon */}
      <div className="flex items-center gap-2 border-r border-gray-200 pr-3">
        <span className="material-icons-round text-gray-400 text-sm">calendar_today</span>
        <span className="text-sm font-bold text-gray-700">{dateString}</span>
      </div>

      {/* Clock Icon */}
      <div className="flex items-center gap-2">
        <span className="material-icons-round text-gray-400 text-sm">schedule</span>
        <span className="text-sm font-bold text-gray-700 min-w-[65px]">{timeString}</span>
      </div>
    </div>
  );
};

export default SystemDateTime;