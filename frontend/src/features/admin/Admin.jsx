import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// style
import styled from 'styled-components';

// feature
import Navbar from '../../common/navbar/Navbar';
import AdminSidebar from './AdminSidebar';
import AdminInfo from './AdminInfo';
import AdminUsersTable from './AdminUsersTable';

// action
import { getUsersData } from './adminSlice';

const Wrapper = styled.div`
  display: flex;
  overflow-y: auto;
  justify-content: center;
  padding: 65px 0px 0px 0px;
  height: 100vh;
`;

const ContentContainer = styled.div`
  width: 80%;
`;

export default function Admin() {
  const { currentMode } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersData());
  }, []);
  return (
    <>
      <Navbar />
      <Wrapper>
        <AdminSidebar />
        <ContentContainer>
          {currentMode === 0 && <AdminInfo />}
          {currentMode === 1 && <AdminUsersTable />}
        </ContentContainer>
      </Wrapper>
    </>
  );
}
