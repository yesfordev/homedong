import React, { useState } from 'react';
import { Calendar as Main } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Badge1 from '../../assets/badge1.png';

const content = ({ date, view }) => {
  // test dates
  const dates = [
    [7, 1],
    [7, 3],
    [7, 5],
  ];
  return dates.map(([m, d]) => {
    return view === 'month' &&
      date.getMonth() === m - 1 &&
      date.getDate() === d ? (
      <img alt="prize" src={Badge1} style={{ width: '70%' }} />
    ) : null;
  });
};

const onClick = (V) => {
  console.log(`클릭한 날짜는 ${V}`);
};

function Calender() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Main
        onChange={onChange}
        value={value}
        tileContent={content}
        onClick={onClick(value)}
      />
    </div>
  );
}

export default Calender;
