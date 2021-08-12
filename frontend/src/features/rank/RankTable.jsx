import React from 'react';
import { useSelector } from 'react-redux';

// style
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
    minWidth: 800,
  },
  temp: {},
});

function createData(ranking, nickname, count, changeStatus) {
  return { ranking, nickname, count, changeStatus };
}

export default function RankTable() {
  const classes = useStyles();
  const { currentRankInfo } = useSelector((state) => state.rank);
  // 현재 순위 정보
  const rows = [];
  if (currentRankInfo) {
    currentRankInfo.forEach((item) => {
      rows.push(createData(...item));
    });
  }
  return (
    <TableContainer style={{ width: '50%' }} component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow hover>
            <TableCell>순위</TableCell>
            <TableCell align="right">닉네임</TableCell>
            <TableCell align="right">갯수</TableCell>
            <TableCell align="right">순위변동</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{ width: '20px' }}>
                {row.ranking}
              </TableCell>
              <TableCell align="right">{row.nickname}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.changeStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
