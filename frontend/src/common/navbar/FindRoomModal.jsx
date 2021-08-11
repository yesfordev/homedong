import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CommonButton } from '../../features/auth/login/Login';
import logo from '../../assets/logo(basic).svg';

const useStyles = makeStyles({
  back: {
    opacity: 0.97,
    borderRadius: 50,
    padding: '0 50px 0 100px',
  },
  dialog: {
    background: '#f6f5fd',
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

export default function FindRoomModal({ isOpen, handleModalClose }) {
  const classes = useStyles();
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
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            방 번호와 비밀번호를 입력해주세요!
          </DialogContentText>
          <TextField autoFocus margin="dense" id="roomNumber" label="방번호" />
          <TextField margin="dense" id="password" label="비밀번호" />
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <CommonButton mauve onClick={handleModalClose} color="primary">
            입장하기
          </CommonButton>
          <CommonButton yellow onClick={handleModalClose} color="secondary">
            취소
          </CommonButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FindRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
