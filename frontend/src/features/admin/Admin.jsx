import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import Navbar from '../../common/navbar/Navbar';
import AdminSidebar from './AdminSidebar';
import AdminInfo from './AdminInfo';
import AdminUsersInfo from './AdminUsersInfo';

const Wrapper = styled.div`
  display: flex;
  padding: 65px 0px 0px 0px;
  height: 100vh;
`;

const ContentContainer = styled.div``;

export default function Admin() {
  const { currentMode } = useSelector((state) => state.admin);
  return (
    <>
      <Navbar />
      <Wrapper>
        <AdminSidebar />
        <ContentContainer>
          {currentMode === 0 && <AdminInfo />}
          {currentMode === 1 && <AdminUsersInfo />}
        </ContentContainer>
      </Wrapper>
    </>
  );
}
