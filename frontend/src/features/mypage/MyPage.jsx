import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// style
import { Container, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';

// image
import defaultImage from '../../assets/default.png';
// import Beginner from '../../assets/beginner.svg';
// import Intermediate from '../../assets/intermediate.svg';
// import Advanced from '../../assets/advanced.svg';
import badgeImages from '../../assets/badgeImages';

// component
import Navbar from '../../common/navbar/Navbar';
import MyTable from './MyTable';
import Calender from './Calender';

// action
import { deleteToken } from '../../common/api/JWT-common';
import { deleteUser } from '../auth/authSlice';
import { loadBadge, loadBestRecord, loadBadgesOwned } from './mypageSlice';
// import { getMonth } from '../../common/api/getTime';

// 전체 컨테이너
const Wrapper = styled(Container)`
  display: flex;
  padding: 65px 0px 0px 0px;
  height: 200vh;
  width: 100%;
`;

// 사이드바
const Sidebar = styled.aside`
  max-width: 20%;
`;

const ProfileImage = styled.img`
  left: 0px;
  width: 100%;
`;

// 메인
const Main = styled.main`
  width: 70%;
`;

// 제목
const Title = styled.div`
  font-weight: bold;
  font-size: 3rem;
`;

// 내용
const Content = styled.div`
  font-size: 2rem;
  display: inline-block;
`;

// 닉네임 이메일
const BasicInfo = styled.section``;

const Nickname = styled.div`
  > button {
    margin-left: 30px;
  }
`;

const Email = styled.div``;

// 기록
const Record = styled.section``;

// 뱃지
const Badges = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const Badge = styled.img`
  width: ${(props) => 100 / props.badgeLen}%;
  border-radius: 50%;
`;

// 메세지
const Message = styled.p``;

// 1일 1동
// const Calender = styled.section``;

// footer
const Footer = styled.footer``;

export default function MyPage() {
  const { nickname, email } = useSelector((state) => state.auth.user);
  const { badgesOwned, consecutiveRecordInfo } = useSelector(
    (state) => state.mypage
  );
  const { duration, workToday } = consecutiveRecordInfo;
  const dispatch = useDispatch();
  const history = useHistory();
  const badgeLen = badgesOwned.length;

  useEffect(() => {
    dispatch(loadBadge())
      .unwrap()
      .then(() => {
        dispatch(loadBadgesOwned());
      });
    dispatch(loadBestRecord());
  }, []);

  const doDeleteUser = () => {
    dispatch(deleteUser())
      .unwrap()
      .then(() => {
        deleteToken();
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <Title>닉네임</Title>
              <Content>{nickname}</Content>
              <Link to="/checkpassword">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                >
                  회원정보수정
                </Button>
              </Link>
            </Nickname>
            <Email>
              <Title>이메일</Title>
              <Content>{email}</Content>
            </Email>
          </BasicInfo>
          <Record>
            <Title>내 기록</Title>
            <MyTable />
          </Record>
          <Badges>
            {badgesOwned.map((badgeOwned) => {
              const [kind, level] = badgeOwned;
              return (
                <Badge
                  badgeLen={badgeLen}
                  key={badgeOwned}
                  src={badgeImages[kind][level]}
                />
              );
            })}
          </Badges>
          {workToday ? (
            <Message>
              현재, {duration}일동안 운동하셨어요!! 오늘도 하셨네요😀
            </Message>
          ) : (
            <Message>{duration}일동안 운동하셨는데..오늘도 하셔야죠!😥</Message>
          )}
          <Calender />
          <Footer>
            <Button variant="contained" size="small">
              1:1문의
            </Button>
            <Button variant="contained" size="small">
              FAQ
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={doDeleteUser}
            >
              회원탈퇴
            </Button>
          </Footer>
        </Main>
      </Wrapper>
    </>
  );
}
