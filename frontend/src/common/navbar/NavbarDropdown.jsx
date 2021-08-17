import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { deleteToken } from '../api/JWT-common';
import { resetUser } from '../../features/auth/authSlice';
import { resetMyPageInfo } from '../../features/mypage/mypageSlice';

import defaultImage from '../../assets/default.png';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    deleteToken();
    dispatch(resetUser());
    dispatch(resetMyPageInfo());
    history.push('/login');
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar alt="default" src={defaultImage} />
      </Button>
      <Menu
        disableScrollLock
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/mypage">
          <MenuItem onClick={handleClose}>마이페이지</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
        <Link to="/admin">
          <MenuItem onClick={handleClose}>관리자페이지</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
