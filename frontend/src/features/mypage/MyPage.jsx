import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// style
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// image
// import defaultImage from '../../assets/default.png';
import badgeImages from '../../assets/badges/badgeImages';
import burpee from '../../assets/burpee.svg';
import pushUp from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';
import profileImages from '../../assets/profile/profileImages';

// component
import Navbar from '../../common/navbar/Navbar';
import MyTable from './MyTable';
import Calendar from './Calendar';
import DeleteModal from './DeleteModal';

// action
import {
  loadBadge,
  loadBestRecord,
  loadBadgesOwned,
  changeUserProfile,
} from './mypageSlice';
import { deleteToken } from '../../common/api/JWT-common';
import { loadUser } from '../auth/authSlice';

// 전체 컨테이너
const Wrapper = styled.div`
  display: flex;
  padding: 100px 0px 0px 0px;
  height: auto;
`;

// 사이드바
const Sidebar = styled.aside`
  display: flex;
  justify-content: center;
  max-width: 20%;
`;

const ProfileImage = styled.img`
  width: 60%;
  height: 15%;
  border-radius: 50%;
  border: 1px solid;
  cursor: pointer;
`;

// 선택할 수 있는 프로필 image 뿌려주기
const VariousImage = styled.img`
  width: 95px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 50%;
`;

const SelectedImage = styled.img`
  width: 95px;
  margin: 5px;
  cursor: pointer;
  border: 4px solid;
  border-radius: 50%;
  border-color: #fbd14b;
`;

// 메인
const Main = styled.main`
  width: 70%;
`;

// 닉네임 이메일
const BasicInfo = styled.section``;

// 제목
const Title = styled.div`
  display: inline-box;
  margin-bottom: ${(props) => (props.getMoreMB ? '40px' : '20px')};
  margin-top: ${(props) => (props.getMoreMT ? '40px' : '0px')};
  font-weight: bold;
  font-size: 3rem;
  border-bottom: 5px solid rgba(251, 209, 75, 0.5);
`;

const CustomMain = styled(Main)`
  display: flex;
  flex-direction: column;
`;

// 내용
const Content = styled.p`
  font-size: 2rem;
  display: block;
  word-break: break-all;
  margin: 0 15px 60px 40px;
`;

const Nickname = styled.div`
  > button {
    margin-left: 30px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
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
  margin-bottom: 40px;
  

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
  width: calc(100% / 3 - 14px);
  margin: 0 7px;
  filter: ${(props) => (props.isPresent ? 'grayscale(0%)' : 'grayscale(100%)')};
  opacity: ${(props) => (props.isPresent ? '1' : '0.3')};
`;

// 메세지
const Message = styled.p`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
`;

const CustomCalendar = styled(Calendar)``;
// footer

const Footer = styled.footer`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  margin: 50px 0;
`;

export default function MyPage() {
  const { nickname, email, img } = useSelector((state) => state.auth.user);
  // badgesOwned
  const { consecutiveRecordInfo, badgesOwned } = useSelector(
    (state) => state.mypage
  );
  const { duration, workToday } = consecutiveRecordInfo;
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
    setCurrentImage(Number(img));
  };

  const handleClose = () => {
    setOpen(false);
    if (Number(img) === currentImage) return;
    dispatch(changeUserProfile(currentImage.toString()))
      .then(() => {
        dispatch(loadUser());
        toast.success('🎨 프로필 사진이 변경되었습니다!');
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요!');
          deleteToken();
          history.push('/login');
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
  };

  // badge 가지고 있는 것 추출하는 함수
  // 각 경기에 대한 뱃지 이미지의 색을 살려준다.
  function drawBadge() {
    badgesOwned.forEach((badgeOwned) => {
      const [kind, level] = badgeOwned;
      // 임시로 뱃지 다보일 수 있게 해줌
      if (kind !== 'sitUp' && kind !== 'homedongKing') {
        badgeImages[kind][level][1] = true;
      }
    });
  }

  function updateCurrentImg(imgNum) {
    setCurrentImage(imgNum);
  }

  useEffect(() => {
    dispatch(loadBadge())
      .unwrap()
      .then(() => {
        dispatch(loadBadgesOwned());
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요!');
          deleteToken();
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
          deleteToken();
          history.push('/login');
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
  }, []);

  useEffect(() => {
    drawBadge();
  }, [dispatch, badgesOwned]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <Sidebar>
          {profileImages.map((profileImage, index) => {
            if (index + 1 === Number(img)) {
              return (
                <ProfileImage
                  src={profileImage}
                  alt="profile"
                  onClick={handleClickOpen}
                />
              );
            }
            return <span> </span>;
          })}
          <div>
            {/* <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              프로필 변경하기
            </Button> */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                변경할 프로필을 골라주세요
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {profileImages.map((profileImage, index) => {
                    if (index + 1 === currentImage) {
                      return <SelectedImage alt="profile" src={profileImage} />;
                    }
                    return (
                      <VariousImage
                        alt="profile"
                        src={profileImage}
                        onClick={() => updateCurrentImg(index + 1)}
                      />
                    );
                  })}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  변경하기
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Sidebar>
        <CustomMain>
          <BasicInfo>
            <Nickname>
              <Title>닉네임</Title>
              <ContentContainer>
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
              </ContentContainer>
            </Nickname>
            <Email>
              <Title>이메일</Title>
              <Content>{email}</Content>
            </Email>
          </BasicInfo>
          <Record>
            <Title getMoreMB>내 기록</Title>
            <MyTable />
          </Record>
          <Title getMoreMT>내 뱃지</Title>
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
          <Title getMoreMB getMoreMT>
            1일 1동
          </Title>
          {workToday ? (
            <Message>
              현재, {duration}일동안 운동하셨어요!! 오늘도 하셨네요😀
            </Message>
          ) : (
            <Message>{duration}일동안 운동하셨는데..오늘도 하셔야죠!😥</Message>
          )}
          <CustomCalendar className="react-calendar" />
          <Footer>
            <DeleteModal />
          </Footer>
        </CustomMain>
      </Wrapper>
    </>
  );
}
