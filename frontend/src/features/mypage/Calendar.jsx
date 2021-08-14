import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar as Main } from 'react-calendar';
import './Calendar.css';

import Badge1 from '../../assets/badge.png';
import { loadDailyRecord, loadConsecutiveRecord } from './mypageSlice';

function Calender() {
  const [value] = useState(new Date());
  const dispatch = useDispatch();
  const { dailyRecordInfo } = useSelector((state) => state.mypage);
  function loadRecord(currentDate) {
    const validDate = currentDate || value;
    const month = validDate.getMonth() + 1;
    const year = validDate.getFullYear();
    dispatch(loadDailyRecord({ month, year }));
  }
  function content({ date, view }) {
    return Array.from(dailyRecordInfo).map(([y, m, d]) => {
      return view === 'month' &&
        date.getFullYear() === Number(y) &&
        date.getMonth() === Number(m) - 1 &&
        date.getDate() === Number(d) ? (
        <img alt="prize" key={[m, d]} src={Badge1} style={{ width: '40%' }} />
      ) : null;
    });
  }
  useEffect(() => {
    loadRecord();
    dispatch(loadConsecutiveRecord());
  }, []);

  return (
    <Main
      className="react-calendar"
      onActiveStartDateChange={({ activeStartDate }) =>
        loadRecord(activeStartDate)
      }
      value={value}
      tileContent={content}
    />
  );
}

export default Calender;
