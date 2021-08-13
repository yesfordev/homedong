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
import styled from 'styled-components';

const useStyles = makeStyles({
  temp: {},
});

const CustomTableContainer = styled(TableContainer)`
  width: 50%;
  border-radius: 10px;
  & th {
    font-size: 1.7rem;
    padding: 20px 0;
    font-weight: 550;
  }
  & td {
    font-size: 1.3rem;
  }
`;

const TableCellRank = styled(TableCell)`
  font-size: 1.2rem;
`;

function createData(ranking, nickname, count, changeStatus, changeRanking) {
  let finalChangeStatus;
  let finalRanking;
  if (changeStatus === 'noChange') {
    finalChangeStatus = '🔺';
  } else if (changeStatus === `up`) {
    finalChangeStatus = `🔺${changeRanking}`;
  } else if (changeStatus === 'down') {
    finalChangeStatus = `🔻${changeRanking}`;
  } else if (changeStatus === 'new') {
    finalChangeStatus = 'new';
  }
  if (ranking === 1) {
    finalRanking = '🥇';
  } else if (ranking === 2) {
    finalRanking = '🥈';
  } else if (ranking === 3) {
    finalRanking = '🥉';
  } else {
    finalRanking = ranking;
  }

  return { finalRanking, nickname, count, finalChangeStatus };
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
    <CustomTableContainer component={Paper}>
      <Table
        padding="normal"
        size="small"
        stickyHeader
        className={classes.table}
        aria-label="a dense table"
      >
        <caption>매일 자정에 업데이트됩니다</caption>
        <TableHead>
          <TableRow hover>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">닉네임</TableCell>
            <TableCell align="center">갯수</TableCell>
            <TableCell align="center">순위변동</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={[row.finalRanking, row.nickname]}>
              <TableCellRank align="center" scope="row">
                {row.finalRanking}
              </TableCellRank>
              <TableCell align="center">{row.nickname}</TableCell>
              <TableCell align="center">{row.count}</TableCell>
              <TableCell style={{ fontSize: '0.6rem' }} align="center">
                {row.finalChangeStatus}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
