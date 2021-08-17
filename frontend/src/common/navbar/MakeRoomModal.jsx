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
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import logo from '../../assets/logo(basic).svg';

// image
import pushup from '../../assets/pushup.svg';
import burpee from '../../assets/burpee.svg';
import squat from '../../assets/squat.svg';

// feautre
import { CommonButton } from '../../features/auth/login/Login';
import RadioButton from './RadioButton';

// action
import { makeRoom } from '../../features/home/homeSlice';
import { deleteToken } from '../api/JWT-common';

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ImageField = styled(motion.img)`
  width: 150px;
  filter: ${(props) => (props.isClicked ? 'grayscale(0%)' : 'grayscale(100%)')};
  opacity: ${(props) => (props.isClicked ? '1' : '0.6')};
`;

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

const Logo = styled.img`
  width: 400px;
  height: 100px;
`;

export default function MakeRoomModal({ isOpen, handleModalClose }) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isPrivate } = useSelector((state) => state.common);
  const [selectedGameType, setSelectedGameType] = useState(1);
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      gameType: selectedGameType,
      password,
    };
    dispatch(makeRoom(data))
      .unwrap()
      .then(() => {})
      .catch((err) => {
        if (err.status === 400) {
          toast.error('😥 입력된 정보를 다시 확인해주세요');
        } else if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요');
          deleteToken();
          history.push('/login');
        } else if (err.status === 500) {
          history.push('/error');
        }
      })
      .then(() => {
        history.push('game');
      });
    handleModalClose();
    setPassword('');
    setSelectedGameType(1);
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
          {isPrivate && (
            <DialogContentText style={{ textAlign: 'center' }}>
              Private으로 만들 경우, 비밀번호를 설정해주세요!
            </DialogContentText>
          )}
          <ValidatorForm onSubmit={handleSubmit}>
            <ImageContainer>
              <ImageField
                src={squat}
                isClicked={selectedGameType === 1}
                onClick={() => {
                  setSelectedGameType(1);
                }}
                whileTap={{ scale: 0.8 }}
              />
              <ImageField
                src={burpee}
                isClicked={selectedGameType === 3}
                onClick={() => {
                  setSelectedGameType(3);
                }}
                whileTap={{ scale: 0.8 }}
              />
              <ImageField
                src={pushup}
                isClicked={selectedGameType === 2}
                onClick={() => {
                  setSelectedGameType(2);
                }}
                whileTap={{ scale: 0.8 }}
              />
            </ImageContainer>
            {isPrivate && (
              <CustomTextValidator
                autoComplete="off"
                autoFocus
                margin="dense"
                id="password"
                label="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                validators={['required']}
                errorMessages={['비밀번호를 입력해주세요']}
              />
            )}

            <DialogActions className={classes.dialogAction}>
              <CommonButton type="submit" mauve="true" color="primary">
                방만들기
              </CommonButton>
              <CommonButton
                yellow="true"
                onClick={handleModalClose}
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
