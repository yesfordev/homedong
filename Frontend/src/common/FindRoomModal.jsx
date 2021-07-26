import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function FindRoomModal({ isOpen, handleModalClose }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          방 찾기
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText>
            방 번호와 비밀번호를 입력해주세요!
          </DialogContentText>
          <TextField autoFocus margin="dense" id="roomNumber" label="방번호" />
          <TextField margin="dense" id="password" label="비밀번호" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            입장하기
          </Button>
          <Button onClick={handleModalClose} color="secondary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FindRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
