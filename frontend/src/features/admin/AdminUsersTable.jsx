import React from 'react';
import { useSelector } from 'react-redux';

// style
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import Divider from '@material-ui/core/Divider';

const CustomTableContainer = styled(TableContainer)`
  width: 90%;
  height: 80%;
  margin: 50px;
  & th {
    font-size: 1.2rem;
    font-weight: 550;
    color: rgba(0, 0, 0, 0.6);
  }
  & td {
    font-size: 1.3rem;
  }
`;

export default function AdminUsersInfo() {
  const { usersData } = useSelector((state) => state.admin);
  console.log(usersData, 'userdata');
  // 현재 순위 정보
  const rows = [];

  usersData.forEach((user) => {
    const { userId, email, nickname } = user;
    rows.push({ userId, email, nickname });
  });

  console.log(rows);
  return (
    <CustomTableContainer component={Paper}>
      <Table
        padding="normal"
        size="small"
        stickyHeader
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow hover>
            <TableCell align="center">회원번호</TableCell>
            <TableCell align="center">아이디</TableCell>
            <TableCell align="center">닉네임</TableCell>
            <TableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(rows).map((row) => (
            <TableRow key={row.userId}>
              <TableCell align="center">{row.userId}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                <div>{row.nickname}</div>
              </TableCell>
              <TableCell align="center">
                <Button>efef</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
    </CustomTableContainer>
  );
}
