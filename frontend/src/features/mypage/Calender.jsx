import React, { useState } from 'react';
import { Calendar as Main } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Badge1 from '../../assets/badge1.png';

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

const onClick = () => {
  console.log('클릭한 날짜는');
};

function Calender() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Main
        onChange={onChange}
        value={value}
        tileContent={content}
        onClick={onClick()}
      />
    </div>
  );
}

export default Calender;
