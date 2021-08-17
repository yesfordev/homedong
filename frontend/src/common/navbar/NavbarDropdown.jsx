import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetUser, logout } from '../../features/auth/authSlice';
import { resetMyPageInfo } from '../../features/mypage/mypageSlice';
import defaultImage from '../../assets/default.png';
import { deleteToken } from '../api/JWT-common';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        history.push('/login');
        dispatch(resetUser());
        dispatch(resetMyPageInfo());
      })
      .catch((err) => {
        if (err.status === 400) {
          toast.error('😥 다시 시도해주세요');
        } else if (err.status === 404) {
          deleteToken();
          history.push('/login');
        } else if (err.status === 401) {
          deleteToken();
          history.push('/login');
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
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
      </Menu>
    </div>
  );
}
