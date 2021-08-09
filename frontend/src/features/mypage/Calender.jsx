import React, { useState, useEffect } from 'react';
import { Calendar as Main } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import Badge1 from '../../assets/badge1.png';
import { loadDailyRecord, loadConsecutiveRecord } from './mypageSlice';

const content = ({ date, view }) => {
  // test dates
  const days = [
    [7, 1],
    [7, 3],
    [7, 5],
  ];
  return days.map(([m, d]) => {
    return view === 'month' &&
      date.getMonth() === m - 1 &&
      date.getDate() === d ? (
      <img alt="prize" key={[m, d]} src={Badge1} style={{ width: '70%' }} />
    ) : null;
  });
};

function Calender() {
  const [value] = useState(new Date());
  const dispatch = useDispatch();

  function loadRecord(currentDate) {
    const validDate = currentDate || value;
    const month = validDate.getMonth() + 1;
    const year = validDate.getFullYear();
    dispatch(loadDailyRecord({ month, year }));
  }
  useEffect(() => {
    loadRecord();
    dispatch(loadConsecutiveRecord());
  }, []);
  return (
    <div>
      <Main
        onChange={() => console.log(value)}
        onActiveStartDateChange={({ activeStartDate }) =>
          loadRecord(activeStartDate)
        }
        value={value}
        tileContent={content}
      />
    </div>
  );
}

export default Calender;
