import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { deleteToken } from '../api/JWT-common';
import { resetUser } from '../../features/auth/authSlice';
import { resetMyPageInfo } from '../../features/mypage/mypageSlice';
import profileImages from '../../assets/profile/profileImages';

// import defaultImage from '../../assets/default.png';

const useStyles = makeStyles({
  profile: {
    border: '0.5px solid',
    width: '55px',
    height: '55px',
  },
});

export default function SimpleMenu() {
  const { img } = useSelector((state) => state.auth.user);

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

  const classes = useStyles();

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {profileImages.map((profileImage, index) => {
          if (index + 1 === Number(img)) {
            return (
              <Avatar
                className={classes.profile}
                alt="profile"
                src={profileImage}
              />
            );
          }
          return <span> </span>;
        })}
        {/* <Avatar alt="default" src={defaultImage} /> */}
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
