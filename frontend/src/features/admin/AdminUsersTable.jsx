import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// style
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { MdDeleteForever } from 'react-icons/md';
import Divider from '@material-ui/core/Divider';

// action
import { letUserDeleted } from './adminSlice';

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

const DeleteTableCell = styled(TableCell)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nickname = styled.div`
  margin-right: 5px;
`;

const DeleteButton = styled(MdDeleteForever)`
  cursor: pointer;
`;

export default function AdminUsersInfo() {
  const { usersData } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  function deleteUser(email) {
    dispatch(letUserDeleted(email));
  }
  // 현재 순위 정보
  const rows = [];

  usersData.forEach((user) => {
    const { userId, email, nickname } = user;
    rows.push({ userId, email, nickname });
  });
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
              <DeleteTableCell align="center">
                <Nickname>{row.nickname}</Nickname>
                <DeleteButton onClick={() => deleteUser(row.email)} />
              </DeleteTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
    </CustomTableContainer>
  );
}
