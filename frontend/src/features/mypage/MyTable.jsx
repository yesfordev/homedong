import React from 'react';
import { useSelector } from 'react-redux';
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

function createData(name, squat, pushUp, burpee) {
  const newBurpee = burpee === -1 ? '기록없음' : burpee;
  const newSquat = squat === -1 ? '기록없음' : squat;
  const newPushUp = pushUp === -1 ? '기록없음' : pushUp;
  return { name, newBurpee, newSquat, newPushUp };
}

export default function MyTable() {
  const classes = useStyles();
  const { bestRecordInfo } = useSelector((state) => state.mypage);
  // const gameTypes = ['squat', 'pushup', 'burpee'];
  const myBestRecord = ['내 최고 기록'];
  const myRank = ['랭킹'];
  let gameType;
  Array.from(bestRecordInfo).forEach((record) => {
    Object.entries(record).map(([key, value]) => {
      if (key === 'gameType') {
        gameType = value;
      }
      return console.log(gameTypes[value - 1], key, '11');
    });
  });

  const rows = [
    createData('내 최고 기록', -1, 6.0, 24),
    createData('랭킹', 237, 9.0, 37),
  ];

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow selected>
            <TableCell />
            <TableCell align="center">윗몸일으키기</TableCell>
            <TableCell align="center">스쿼트</TableCell>
            <TableCell align="center">팔굽혀펴기</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow align="center" key={row.name}>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.newBurpee}</TableCell>
              <TableCell align="center">{row.newSquat}</TableCell>
              <TableCell align="center">{row.newPushUp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
