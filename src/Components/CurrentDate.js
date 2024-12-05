import React, { useEffect, useState, useMemo } from 'react';


function CurrentDateTime() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = useMemo(() => currentDate.toLocaleDateString(), [currentDate]);
  const formattedTime = useMemo(
    () =>
      currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24HourFormat,
      }),
    [currentDate, is24HourFormat]
  );

  const toggleTimeFormat = () => setIs24HourFormat((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className={`datetime-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="controls">
        <button onClick={toggleTimeFormat}>
          {is24HourFormat ? 'Switch to 12-hour' : 'Switch to 24-hour'}
        </button>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="date" data-title="Today's Date" aria-label={`Today's date is ${formattedDate}`}>
        📅 {formattedDate}
      </div>
      <div className="time pulse" data-title="Current Time" aria-label={`Current time is ${formattedTime}`}>
        ⏰ {formattedTime}
      </div>
      <div className="timezone">Time Zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
    </div>
  );
}

export default CurrentDateTime;
