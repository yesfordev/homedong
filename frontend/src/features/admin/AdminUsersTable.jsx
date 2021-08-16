import React, { useState } from 'react';
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
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';

const CustomTableContainer = styled(TableContainer)`
  width: 90%;
  margin-top: 50px;
  & th {
    font-size: 1.2rem;
    font-weight: 550;
    color: rgba(0, 0, 0, 0.6);
  }
  & td {
    font-size: 1.3rem;
  }
`;

const TableCellRank = styled(TableCell)`
  font-size: 1.2rem;
`;

const CustomTableRow = styled(TableRow)``;

// function createData(ranking, nickname, count, changeStatus, changeRanking) {
//   return { finalRanking, nickname, count, finalChangeStatus };
// }

export default function AdminUsersInfo() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const { currentRankInfo } = useSelector((state) => state.rank);
  // 현재 순위 정보
  const rows = [];
  if (currentRankInfo) {
    currentRankInfo.forEach((item) => {
      console.log(item);
      // rows.push(createData(...item));
    });
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <CustomTableContainer component={Paper}>
        <Table
          padding="normal"
          size="small"
          stickyHeader
          aria-label="a dense table"
        >
          <caption>회원</caption>
          <TableHead>
            <CustomTableRow hover>
              <TableCell align="center" />
              <TableCell align="center">아이디</TableCell>
              <TableCell align="center">닉네임</TableCell>
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
        <Divider />
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CustomTableContainer>
    </>
  );
}
