import React from 'react';
// style
// import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';

// feature

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in ref={ref} {...props} />;
});

export default function RankModal({ rankInfo, isOpen, handleModalClose }) {
  const classes = useStyles();
  return (
    <>
      <Dialog
        className={classes.back}
        fullWidth
        open={isOpen}
        onClose={handleModalClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.dialog} id="form-dialog-title">
          <h1>랭킹</h1>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            {rankInfo === false ? <span>false</span> : <span>true</span>}
          </DialogContentText>
          <DialogActions className={classes.dialogAction}>
            <Button
              onClick={() => {
                handleModalClose();
              }}
              color="secondary"
            >
              닫기
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
