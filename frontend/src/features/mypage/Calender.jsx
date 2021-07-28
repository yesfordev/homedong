import React, { useState } from 'react';
import { Calendar as Main } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const content = ({ date, view }) => {
  return view === 'month' && date.getDay() === 2 ? '😀' : null;
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
