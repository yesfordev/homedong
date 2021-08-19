import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// style
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import logo from '../../assets/logo(basic).svg';

// feature
import { CommonButton } from '../../features/auth/login/Login';
import RadioButton from './RadioButton';
import { deleteToken } from '../api/JWT-common';

// action
import { searchRoom } from '../../features/home/homeSlice';
import { resetMyPageInfo } from '../../features/mypage/mypageSlice';

const useStyles = makeStyles({
  back: {
    opacity: 0.97,
    padding: '0 50px 0 100px',
    '& .MuiPaper-rounded': {
      borderRadius: '15px',
    },
  },
  dialog: {
    background: '#f6f5fd',
    paddingBottom: '0px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    background: '#f6f5fd',
  },
  dialogAction: {
    background: '#f6f5fd',
    flexDirection: 'row',
  },
});

const CustomTextValidator = styled(TextValidator)`
  opacity: 0.8;
  width: 100%;
  height: 70px;
  font-size: 10px;
  padding: 1em 0 1em 0;

  & .MuiInput-inputMarginDense {
    border-radius: 6px;
    background-color: #ffffff;
    padding: 0.6em;
  }

  & .MuiInput-underline:before {
    opacity: 0;
  }

  .MuiInput-underline:after {
    opacity: 0.3;
    color: #9fa9d8;
  }
`;

const Logo = styled.img`
  width: 400px;
  height: 100px;
`;

export default function FindRoomModal({ isOpen, handleModalClose }) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isPrivate } = useSelector((state) => state.common);
  const [password, setPassword] = useState('');
  const [roomId, setRoomId] = useState('');

  function resetInfo() {
    setRoomId('');
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      roomId,
      password,
    };
    dispatch(searchRoom(data))
      .unwrap()
      .then(() => {
        handleModalClose();
        dispatch(resetMyPageInfo());
        resetInfo();
        history.push('/game');
      })
      .catch((err) => {
        if (err.status === 400) {
          toast.error('😥 입력된 정보를 다시 확인해주세요');
        } else if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요');
          deleteToken();
          history.push('/login');
        } else if (err.status === 409) {
          toast.error('😥 현재 방에 접속할 수 없는 상태입니다');
        } else if (err.status === 404) {
          toast.error('😥 방 정보가 없습니다.');
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
  }

  return (
    <div>
      <Dialog
        className={classes.back}
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          className={classes.dialog}
          id="form-dialog-title"
          style={{ textAlign: 'center' }}
        >
          <Logo src={logo} />
        </DialogTitle>
        <RadioButton />
        <DialogContent className={classes.dialogContent}>
          {isPrivate ? (
            <DialogContentText>
              방 번호와 비밀번호를 입력해주세요!
            </DialogContentText>
          ) : (
            <DialogContentText>방 번호를 입력해주세요!</DialogContentText>
          )}
          <ValidatorForm onSubmit={handleSubmit}>
            <CustomTextValidator
              autoFocus
              margin="dense"
              id="roomNumber"
              label="방번호"
              InputLabelProps={{
                shrink: true,
              }}
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.replace(/\s/g, ''))}
              validators={['required']}
              errorMessages={['방번호를 입력해주세요']}
            />
            {isPrivate && (
              <CustomTextValidator
                id="password"
                autoComplete="off"
                label="비밀번호"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                value={password}
                validators={['required']}
                errorMessages={['비밀번호를 입력해주세요']}
              />
            )}
            <DialogActions className={classes.dialogAction}>
              <CommonButton mauve="true" type="submit" color="primary">
                입장하기
              </CommonButton>
              <CommonButton
                yellow="true"
                onClick={() => {
                  handleModalClose();
                  resetInfo();
                }}
                color="secondary"
              >
                취소
              </CommonButton>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
