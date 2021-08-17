import React from 'react';
import { useSelector } from 'react-redux';

// style
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const CustomTableContainer = styled(TableContainer)`
  width: 55%;
  border-radius: 10px;
  margin-bottom: 60px;
  & th {
    font-size: 1.7rem;
    padding: 20px 0;
    font-weight: 550;
    background-color: rgba(159, 169, 216, 1);
    color: rgba(0, 0, 0, 0.6);
  }
  & td {
    font-size: 1.3rem;
  }

  @media (max-width: 414px) {
    width: 90%;
    & th {
      font-size: 1.2rem;
      padding: 10px 0;
    }
  }
`;

const TableCellRank = styled(TableCell)`
  font-size: 1.2rem;
`;

const CustomTableRow = styled(TableRow)`
  border-radius: 10px;
`;

function createData(ranking, nickname, count, changeStatus, changeRanking) {
  let finalChangeStatus;
  let finalRanking;
  if (changeStatus === 'noChange') {
    finalChangeStatus = '-';
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
        aria-label="a dense table"
      >
        <caption>매일 자정에 업데이트됩니다</caption>
        <TableHead>
          <CustomTableRow hover>
            <TableCell align="center">순위</TableCell>
            <TableCell align="center">닉네임</TableCell>
            <TableCell align="center">갯수</TableCell>
            <TableCell align="center">순위변동</TableCell>
          </CustomTableRow>
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
