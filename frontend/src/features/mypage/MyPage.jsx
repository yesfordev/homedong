import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// style
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import { toast } from 'react-toastify';

// image
import defaultImage from '../../assets/default.png';
import badgeImages from '../../assets/badges/badgeImages';
import burpee from '../../assets/burpee.svg';
import pushUp from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';

// component
import Navbar from '../../common/navbar/Navbar';
import MyTable from './MyTable';
import Calender from './Calender';
import DeleteModal from './DeleteModal';

// action
import { loadBadge, loadBestRecord, loadBadgesOwned } from './mypageSlice';

// 전체 컨테이너
const Wrapper = styled.div`
  display: flex;
  padding: 65px 0px 0px 0px;
  height: 200vh;
  width: 100%;

  @media (max-width: 767px) {
    height: auto;
  }
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
const Content = styled.p`
  font-size: 2rem;
  display: block;
  word-break: break-all;
`;

// 닉네임 이메일
const BasicInfo = styled.section``;

const Nickname = styled.div`
  > button {
    margin-left: 30px;
  }
`;

const Email = styled.div`
  width: 100%;
`;

// 기록
const Record = styled.section``;

// 뱃지
const Badges = styled.section`
  display: flex;
  justify-content: ${(props) => (props.isHomeDongKing ? 'center' : '')};
  flex-direction: row;
  

  @media (max-width: 767px) {
    display: block;
    margin-top: 10px;
`;

// 운동종류
const ExerciseKind = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 운동종류 이미지
const ExerciseImage = styled.img`
  width: 50%;
  margin: 40px auto;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

// 뱃지 컨테이너
const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// 뱃지
const Badge = styled.img`
  width: calc(100% / 3);
  filter: ${(props) => (props.isPresent ? 'grayscale(0%)' : 'grayscale(100%)')};
  opacity: ${(props) => (props.isPresent ? '1' : '0.3')};
`;

// 메세지
const Message = styled.p``;

// footer
const Footer = styled.footer``;

export default function MyPage() {
  const { nickname, email } = useSelector((state) => state.auth.user);
  // badgesOwned
  const { consecutiveRecordInfo, badgesOwned } = useSelector(
    (state) => state.mypage
  );
  const { duration, workToday } = consecutiveRecordInfo;
  const dispatch = useDispatch();
  const history = useHistory();

  // badge 가지고 있는 것 추출하는 함수
  // 각 경기에 대한 뱃지 이미지의 색을 살려준다.

  function drawBadge() {
    badgesOwned.forEach((badgeOwned) => {
      const [kind, level] = badgeOwned;
      if (kind !== 'sitUp' && kind !== 'homedongKing') {
        console.log(kind, level, badgesOwned);
        badgeImages[kind][level][1] = true;
      }
    });
  }

  useEffect(() => {
    dispatch(loadBadge())
      .unwrap()
      .then(() => {
        console.log('drawBadge');
        dispatch(loadBadgesOwned());
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요!');
          history.push('/login');
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
    dispatch(loadBestRecord())
      .unwrap()
      .catch((err) => {
        if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요!');
          history.push('/login');
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
  }, []);

  useEffect(() => {
    drawBadge();
  }, [badgesOwned]);

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
          {badgeImages.homedongKing.best[1] === true ? (
            <Badges isHomeDongKing>
              <Badge isPresent src={badgeImages.homedongKing.best[0]} />
            </Badges>
          ) : (
            <Badges>
              <ExerciseKind>
                <ExerciseImage src={squat} alt="badge" />
                <BadgeContainer>
                  <Badge
                    isPresent={badgeImages.squat.beginner[1]}
                    src={badgeImages.squat.beginner[0]}
                    alt="badge"
                  />
                  <Badge
                    isPresent={badgeImages.squat.intermediate[1]}
                    src={badgeImages.squat.intermediate[0]}
                    alt="badge"
                  />
                  <Badge
                    isPresent={badgeImages.squat.advanced[1]}
                    src={badgeImages.squat.advanced[0]}
                    alt="badge"
                  />
                </BadgeContainer>
              </ExerciseKind>
              <ExerciseKind>
                <ExerciseImage src={burpee} alt="badge" />
                <BadgeContainer>
                  <Badge
                    isPresent={badgeImages.burpee.beginner[1]}
                    src={badgeImages.burpee.beginner[0]}
                    alt="badge"
                  />
                  <Badge
                    isPresent={badgeImages.burpee.intermediate[1]}
                    src={badgeImages.burpee.intermediate[0]}
                    alt="badge"
                  />
                  <Badge
                    isPresent={badgeImages.burpee.advanced[1]}
                    src={badgeImages.burpee.advanced[0]}
                    alt="badge"
                  />
                </BadgeContainer>
              </ExerciseKind>
              <ExerciseKind>
                <ExerciseImage src={pushUp} alt="badge" />
                <BadgeContainer>
                  <Badge
                    isPresent={badgeImages.pushUp.beginner[1]}
                    src={badgeImages.pushUp.beginner[0]}
                    alt="badge"
                  />
                  <Badge
                    isPresent={badgeImages.pushUp.intermediate[1]}
                    src={badgeImages.pushUp.intermediate[0]}
                    alt="badge"
                  />
                  <Badge
                    isPresent={badgeImages.pushUp.advanced[1]}
                    src={badgeImages.pushUp.advanced[0]}
                    alt="badge"
                  />
                </BadgeContainer>
              </ExerciseKind>
            </Badges>
          )}

          {workToday ? (
            <Message>
              현재, {duration}일동안 운동하셨어요!! 오늘도 하셨네요😀
            </Message>
          ) : (
            <Message>{duration}일동안 운동하셨는데..오늘도 하셔야죠!😥</Message>
          )}
          <Calender />
          <Footer>
            <DeleteModal />
          </Footer>
        </Main>
      </Wrapper>
    </>
  );
}
