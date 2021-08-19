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
import { withStyles } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ReactCardFlip from 'react-card-flip';

// image

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
  flex: 1;
  justify-content: center;
  margin-left: 5%;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #ffa1b5 30%, #ffa87a 80%);
  border-radius: 50%;
  border: ${(props) => (!props.isMouseOver ? '1px solid' : '5px solid')};
  cursor: pointer;
  border-color: ${(props) => (!props.isMouseOver ? 'white' : '#edb9bb')};
`;

// 선택할 수 있는 프로필 image 뿌려주기
const VariousImage = styled.img`
  width: 95px;
  margin: 5px;
  cursor: pointer;
  border: 2px solid;
  border-radius: 50%;
  border-color: #f5e4e7;
`;

const SelectedImage = styled.img`
  width: 95px;
  margin: 5px;
  cursor: pointer;
  border: 4px solid;
  border-radius: 50%;
  border-color: #ff859f;
  background: linear-gradient(45deg, #ffa1b5 30%, #ffa87a 80%);
`;

// 메인
const Main = styled.main`
  flex: 5;
  display: flex;
`;

// 닉네임 이메일
const BasicInfo = styled.section``;

// 제목
const Title = styled.div`
  display: inline-box;
  margin-bottom: ${(props) => (props.getMoreMB ? '40px' : '20px')};
  margin-top: ${(props) => (props.getMoreMT ? '40px' : '0px')};
  font-weight: bold;
  font-size: 1.5rem;
  border-bottom: 5px solid rgba(251, 209, 75, 0.5);
`;

const CustomMain = styled(Main)`
  display: flex;
  flex-direction: column;
  margin-right: 10%;
`;

// 내용
const Content = styled.p`
  font-size: 1.9rem;
  display: block;
  word-break: break-all;
  margin: 0 15px 60px 40px;
`;

const Nickname = styled.div`
  > button {
    margin-left: 30px;
  }
`;

const CommonButton = styled(Button)`
  width: 100%;
  border-radius: 6px;
  padding: 0.4em 1em;
  background: #9fa9d8;
  color: white;

  &:hover {
    background: #8090d8;
    color: white;
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
  cursor: pointer;
  

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
  cursor: pointer;
  filter: ${(props) => (props.isPresent ? 'grayscale(0%)' : 'grayscale(100%)')};
  opacity: ${(props) => (props.isPresent ? '1' : '0.3')};
`;
// 뱃지 툴팁
const BadgeTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#9FA9D8',
    color: 'white',
    maxWidth: 230,
    fontSize: 15,
    border: '1px solid #9FA9D8',
  },
}))(Tooltip);

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

export function resetBadge() {
  const title = ['squat', 'burpee', 'pushUp'];
  const level = ['beginner', 'intermediate', 'advanced'];
  title.forEach((type) =>
    level.forEach((difficulty) => {
      badgeImages[type][difficulty][1] = false;
    })
  );
}

// tooltip
const ProfileTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#9FA9D8',
    color: 'white',
    maxWidth: 280,
    fontSize: 11,
    border: '1px solid #9FA9D8',
  },
}))(Tooltip);

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
  const [mouseState, setMouseState] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // badge 가지고 있는 것 추출하는 함수
  // 각 경기에 대한 뱃지 이미지의 색을 살려준다.
  function drawBadge() {
    badgesOwned.forEach((badgeOwned) => {
      const [kind, level] = badgeOwned;
      badgeImages[kind][level][1] = true;
    });
  }

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

  function updateCurrentImg(imgNum) {
    setCurrentImage(imgNum);
  }

  function handleMouseOver() {
    setMouseState(true);
  }

  function handleMouseOut() {
    setMouseState(false);
  }

  useEffect(() => {
    drawBadge();
  });

  useEffect(() => {
    dispatch(loadBadge())
      .unwrap()
      .then(() => {
        dispatch(loadBadgesOwned())
          .unwrap()
          .then(() => {
            drawBadge();
          });
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

  return (
    <>
      <Navbar />
      <Wrapper>
        <Sidebar>
          {profileImages.map((profileImage, index) => {
            if (index + 1 === Number(img)) {
              return (
                <ProfileTooltip
                  title={
                    <>
                      <Typography color="inherit">
                        프로필을 변경하려면 👆🏼 클릭해주세요!
                      </Typography>
                    </>
                  }
                >
                  <ProfileImage
                    src={profileImage}
                    alt="profile"
                    onClick={handleClickOpen}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    isMouseOver={mouseState}
                  />
                </ProfileTooltip>
              );
            }
            return <span> </span>;
          })}
          <div>
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
                  <CommonButton
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    회원정보수정
                  </CommonButton>
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
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Badges onClick={handleClick}>
              <ExerciseKind>
                <ExerciseImage src={squat} alt="badge" />
                <BadgeContainer>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">잔근육(다리)</Typography>
                        <span>
                          {badgeImages.squat.beginner[1]
                            ? '스쿼트 최고 기록이 10개 이상이면 획득할 수 있다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.squat.beginner[1]}
                      src={badgeImages.squat.beginner[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">실전근육(다리)</Typography>
                        <span>
                          {badgeImages.squat.intermediate[1]
                            ? '스쿼트 최고 기록이 20개 이상이면 획득할 수 있다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.squat.intermediate[1]}
                      src={badgeImages.squat.intermediate[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">하체왕</Typography>
                        <span>
                          {badgeImages.squat.advanced[1]
                            ? '스쿼트 최고 기록이 30개 이상이면 획득할 수 있다. 스쿼트를 마스터 한 자에게 주어진다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.squat.advanced[1]}
                      src={badgeImages.squat.advanced[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                </BadgeContainer>
              </ExerciseKind>
              <ExerciseKind>
                <ExerciseImage src={burpee} alt="badge" />
                <BadgeContainer>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">잔근육(코어)</Typography>
                        <span>
                          {badgeImages.burpee.beginner[1]
                            ? '버피 최고 기록이 5개 이상이면 획득할 수 있다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.burpee.beginner[1]}
                      src={badgeImages.burpee.beginner[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">실전근육(코어)</Typography>
                        <span>
                          {badgeImages.burpee.intermediate[1]
                            ? '버피 최고 기록이 10개 이상이면 획득할 수 있다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.burpee.intermediate[1]}
                      src={badgeImages.burpee.intermediate[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">코어왕</Typography>
                        <span>
                          {badgeImages.burpee.advanced[1]
                            ? '버피 최고 기록이 15개 이상이면 획득할 수 있다. 버피를 마스터 한 자에게 주어진다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.burpee.advanced[1]}
                      src={badgeImages.burpee.advanced[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                </BadgeContainer>
              </ExerciseKind>
              <ExerciseKind>
                <ExerciseImage src={pushUp} alt="badge" />
                <BadgeContainer>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">잔근육(팔)</Typography>
                        <span>
                          {badgeImages.pushUp.beginner[1]
                            ? '푸시업 최고 기록이 10개 이상이면 획득할 수 있다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.pushUp.beginner[1]}
                      src={badgeImages.pushUp.beginner[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">실전근육(팔)</Typography>
                        <span>
                          {badgeImages.pushUp.intermediate[1]
                            ? '푸시업 최고 기록이 15개 이상이면 획득할 수 있다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.pushUp.intermediate[1]}
                      src={badgeImages.pushUp.intermediate[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                  <BadgeTooltip
                    title={
                      <div>
                        <Typography color="inherit">팔뚝왕</Typography>
                        <span>
                          {badgeImages.pushUp.advanced[1]
                            ? '푸시업 최고 기록이 20개 이상이면 획득할 수 있다. 푸시업을 마스터 한 자에게 주어진다.'
                            : '더 운동하고 오세요!'}
                        </span>
                      </div>
                    }
                  >
                    <Badge
                      isPresent={badgeImages.pushUp.advanced[1]}
                      src={badgeImages.pushUp.advanced[0]}
                      alt="badge"
                    />
                  </BadgeTooltip>
                </BadgeContainer>
              </ExerciseKind>
            </Badges>
            <Badges isHomeDongKing onClick={handleClick}>
              <BadgeTooltip
                title={
                  <div>
                    <Typography color="inherit">홈동킹</Typography>
                    <span>
                      {badgeImages.homedongKing.best[1]
                        ? '하체왕, 코어왕, 팔뚝왕을 모두 획득한 당신. 당신은 진정한 홈동킹입니다.✨'
                        : '아직 훨씬 더 많은 운동이 필요합니다!'}
                    </span>
                  </div>
                }
              >
                <Badge
                  isPresent={badgeImages.homedongKing.best[1]}
                  src={badgeImages.homedongKing.best[0]}
                  alt="badge"
                />
              </BadgeTooltip>
            </Badges>
          </ReactCardFlip>

          <Title getMoreMB getMoreMT>
            1일 1동
          </Title>
          {workToday ? (
            <Message>
              오늘까지 {duration}일동안 운동하셨어요!! 고생하셨어요!😀
            </Message>
          ) : (
            <Message>
              어제까지 {duration}일동안 운동하셨는데..오늘도 하셔야죠!😥
            </Message>
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
