import React from 'react';
// style
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import { CgClose } from 'react-icons/cg';

const RankDialog = styled(Dialog)`
  opacity: 0.97;
  padding: 0 50px 0 100px;
  & .MuiPaper-rounded {
    border-radius: 15px;
  }
`;

const RankDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: center;
  background-color: rgba(106, 96, 169, 0.5);
  padding-bottom: 0;

  & > .MuiTypography-root {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.p`
  color: white;
`;

const CancelButton = styled(CgClose)`
  cursor: pointer;
  color: white;
  justify-self: flex-end;
`;

const RankDialogContent = styled(DialogContent)`
  display: flex;
  color: white;
  flex-direction: column;
  background-color: rgba(106, 96, 169, 0.5);
`;

const RankDialogContentText = styled(DialogContentText)``;

const RankDialogActions = styled(DialogActions)`
  flex-direction: row;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in ref={ref} {...props} />;
});

export default function RankModal({ rankInfo, isOpen, handleModalClose }) {
  console.log(rankInfo, 'type');
  return (
    <>
      <RankDialog
        fullWidth
        open={isOpen}
        onClose={handleModalClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <RankDialogTitle c id="form-dialog-title">
          <Title>랭킹</Title>
        </RankDialogTitle>
        <RankDialogContent>
          <RankDialogContentText>
            {rankInfo === undefined
              ? '정보 없음'
              : rankInfo.map(([key, value]) => (
                  <div>
                    {key}
                    {value}
                  </div>
                ))}
          </RankDialogContentText>
          <RankDialogActions>
            <CancelButton
              onClick={() => {
                handleModalClose();
              }}
            />
          </RankDialogActions>
        </RankDialogContent>
      </RankDialog>
    </>
  );
}
