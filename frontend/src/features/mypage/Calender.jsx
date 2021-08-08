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
  useEffect(() => {
    console.log(value.getMonth(), value.getFullYear(), '날짜');
    dispatch(loadDailyRecord(value.getMonth() + 1, value.getFullYear()));
    dispatch(loadConsecutiveRecord());
  }, []);

  function loadRecord(currentDate) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    dispatch(loadDailyRecord({ month, year }));
    dispatch(loadConsecutiveRecord());
  }
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
