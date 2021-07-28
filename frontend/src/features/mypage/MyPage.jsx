import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import Badge1 from '../../assets/badge1.png';
import Badge2 from '../../assets/badge2.png';
import defaultImage from '../../assets/default.png';
import Navbar from '../../common/Navbar';
import MyTable from './MyTable';

// 전체 컨테이너
const Wrapper = styled(Container)`
  display: flex;
  padding: 65px 0px 0px 0px;
  height: 120vh;
`;
// alc(100vh - 65px)

// 사이드바
const Sidebar = styled.aside`
  width: 20%;
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 80%;
`;

// 메인
const Main = styled.main``;

// 닉네임 이메일
const BasicInfo = styled.section``;

const Nickname = styled.div``;

const Email = styled.div``;

// 기록
const Record = styled.section``;

// 뱃지
const Badges = styled.section`
  width: 100px;
`;

const Badge = styled.img`
  width: 100px;
  background-colr: black;
`;

// 1일 1동
const Calender = styled.section``;

// footer
const Footer = styled.footer``;

export default function MyPage() {
  const { nickname, email } = useSelector((state) => state.auth.user);
  return (
    <>
      <Navbar />
      <Wrapper>
        <Sidebar>
          <ProfileImage src={defaultImage} alt="profile" />
        </Sidebar>
        <Main>
          <BasicInfo>
            <Nickname>
              <h1>닉네임</h1>
              <div>{nickname}</div>
              <button type="button">회원정보수정</button>
            </Nickname>
            <Email>
              <h1>이메일</h1>
              <div>{email}</div>
            </Email>
          </BasicInfo>
          <Record>
            <h1>내 기록</h1>
            <MyTable />
          </Record>
          <Badges>
            <Badge src={Badge1} alt="image" />
            <Badge src={Badge2} alt="image" />
            <Badge src={Badge1} alt="image" />
          </Badges>
          <Calender>this is Calender section</Calender>
          <Footer>
            <button type="button">1:1문의</button>
            <button type="button">FAQ</button>
            <button type="button">회원탈퇴</button>
          </Footer>
        </Main>
      </Wrapper>
    </>
  );
}
