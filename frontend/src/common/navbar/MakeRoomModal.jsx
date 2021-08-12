import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { CommonButton } from '../../features/auth/login/Login';
import logo from '../../assets/logo(basic).svg';

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ImageField = styled.img`
  width: 30%;
`;

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

export default function MakeRoomModal({ isOpen, handleModalClose }) {
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
            Private으로 만들 경우, 비밀번호를 설정해주시면 됩니다!
          </DialogContentText>
          <ImageContainer>
            <ImageField src="https://picsum.photos/50" />
            <ImageField src="https://picsum.photos/50" />
            <ImageField src="https://picsum.photos/50" />
          </ImageContainer>
          <TextField autoFocus margin="dense" id="password" label="비밀번호" />
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <CommonButton mauve onClick={handleModalClose} color="primary">
            방만들기
          </CommonButton>
          <CommonButton yellow onClick={handleModalClose} color="secondary">
            취소
          </CommonButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MakeRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
