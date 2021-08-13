import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    width: '100%',
  },
});

const CustomTableContainer = styled(TableContainer)`
  border-radius: 10px;
  & th {
    background-color: rgba(159, 169, 216, 0.2);
    font-size: 1.5rem;
    font-weight: bold;
  }
  & td {
    font-size: 1.3rem;
  }
`;

function createData(name, squat, pushUp, burpee) {
  const newBurpee = burpee === -1 ? '기록없음' : burpee;
  const newSquat = squat === -1 ? '기록없음' : squat;
  const newPushUp = pushUp === -1 ? '기록없음' : pushUp;
  return { name, newBurpee, newSquat, newPushUp };
}

function handleData(data, rows) {
  const names = ['내 최고 기록', '랭킹'];
  const bestRecords = [];
  const rankings = [];

  if (data) {
    Array.from(data).forEach((record) => {
      const { bestRecord, ranking } = record;
      bestRecords.push(bestRecord);
      rankings.push(ranking);
    });
    rows.push(createData(names[0], ...bestRecords));
    rows.push(createData(names[1], ...rankings));
  }
}

export default function MyTable() {
  const rows = [];
  const classes = useStyles();
  const { bestRecordInfo } = useSelector((state) => state.mypage);

  if (bestRecordInfo) {
    handleData(bestRecordInfo, rows);
  }

  return (
    <CustomTableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow selected>
            <TableCell />
            <TableCell align="center">스쿼트</TableCell>
            <TableCell align="center">푸쉬업</TableCell>
            <TableCell align="center">버피</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow align="center" key={row.name}>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.newSquat}</TableCell>
              <TableCell align="center">{row.newPushUp}</TableCell>
              <TableCell align="center">{row.newBurpee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
