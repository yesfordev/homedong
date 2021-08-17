import React from 'react';
import { useDispatch } from 'react-redux';

// style
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ImUserTie } from 'react-icons/im';
import { HiUserGroup } from 'react-icons/hi';
import styled from 'styled-components';

// action
import { setCurrentMode } from './adminSlice';

const Wrapper = styled.div`
  display: flex;
  & .MuiPaper-root {
    background-color: rgba(246, 245, 253, 1);
  }

  & .MuiList-root {
    padding: 0;
  }
  & span {
  }
`;

const CustomDrawer = styled(Drawer)`
  z-index: 1;
  width: 200px;
`;

const DrawerContainer = styled.div`
  overflow: 'auto';
`;

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 200,
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <CustomDrawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <DrawerContainer>
          <List>
            {['관리자 정보', '회원 목록'].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  dispatch(setCurrentMode(index));
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <ImUserTie /> : <HiUserGroup />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </DrawerContainer>
      </CustomDrawer>
    </Wrapper>
  );
}
