import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar as Main } from 'react-calendar';
import './Calendar.css';
import { withStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Badge1 from '../../assets/badge.png';
import { loadDailyRecord, loadConsecutiveRecord } from './mypageSlice';

// tooltip
const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#9FA9D8',
    color: 'white',
    maxWidth: 280,
    fontSize: 14,
    border: '1px solid #9FA9D8',
  },
}))(Tooltip);

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
    return Array.from(dailyRecordInfo).map(
      ([y, m, d, squatCnt, burpeeCnt, pushupCnt]) =>
        view === 'month' &&
        date.getFullYear() === Number(y) &&
        date.getMonth() === Number(m) - 1 &&
        date.getDate() === Number(d) ? (
          <HtmlTooltip
            title={
              <>
                <Typography color="inherit">
                  {y}년 {m}월 {d}일의 기록
                </Typography>
                {squatCnt !== -1 ? <div>👉🏼스쿼트 : {squatCnt} 개</div> : null}
                {burpeeCnt !== -1 ? <div>👉🏼버피 : {burpeeCnt} 개</div> : null}
                {pushupCnt !== -1 ? <div>👉🏼푸쉬업 : {pushupCnt} 개</div> : null}
              </>
            }
          >
            <img
              alt="prize"
              key={[m, d]}
              src={Badge1}
              style={{ width: '40%' }}
            />
          </HtmlTooltip>
        ) : (
          <div style={{ width: '40%', height: '7px' }}> </div>
        )
    );
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
