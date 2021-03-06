// basic
import React, { useState, forwardRef } from 'react';
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

import Zoom from '@material-ui/core/Zoom';

// toast
import { toast } from 'react-toastify';

// action
import { deleteToken } from '../../common/api/JWT-common';
import { deleteUser } from '../auth/authSlice';

const Transition = forwardRef(function Transition(props, ref) {
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
        toast.success('π₯ νμνν΄κ° μλ£ λμμ΅λλ€');
        deleteToken();
        history.push('/login');
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.error('π₯ λ‘κ·ΈμΈμ λ€μ ν΄μ£ΌμΈμ!');
          deleteToken();
          history.push('/login');
        } else if (err.status === 404) {
          toast.error('π₯ νμμ λ³΄κ° μ‘΄μ¬νμ§ μμ΅λλ€');
          deleteToken();
          history.push('/login');
        } else if (err.status === 400) {
          toast.error('π₯ λ€μ ν λ² μλν΄μ£ΌμΈμ');
        } else if (err.status === 500) {
          history.push('/error');
        }
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
        νμνν΄
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
            {nickname}λ μ λ§λ‘ νν΄νμκ² μ΅λκΉ?π₯π₯
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            μ·¨μ
          </Button>
          <Button onClick={doDeleteUser} color="primary">
            νμΈ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
