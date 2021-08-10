// basic
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// material ui
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';

// toast
import { toast } from 'react-toastify';

// action
import { deleteToken } from '../../common/api/JWT-common';
import { deleteUser } from '../auth/authSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in ref={ref} {...props} />;
});

export default function DraggableDialog() {
  const [open, setOpen] = useState(false);
  const { nickname } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const doDeleteUser = () => {
    handleClose();
    dispatch(deleteUser())
      .unwrap()
      .then(() => {
        toast.success('😥 회원탈퇴가 완료 되었습니다');
        deleteToken();
        history.push('/login');
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error('😥 로그인을 다시 해주세요!');
          deleteToken();
          history.push('/login');
        } else if (err.status === 400) {
          toast.error('😥 다시 한 번 시도해주세요');
        } else if (err.status === 500) {
          history.push('/error');
        } // 404 에러 처리
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        회원탈퇴
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" />
        <DialogContent>
          <DialogContentText>
            {nickname}님 정말로 탈퇴하시겠습니까?😥😥
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={doDeleteUser} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
