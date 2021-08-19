import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import isAuthenticated from '../api/isAuthenticated';
import { loadUser } from '../../features/auth/authSlice';
import { deleteToken } from '../api/JWT-common';
import { resetBadge } from '../../features/mypage/MyPage';

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/mypage') {
      resetBadge();
    }
    dispatch(loadUser())
      .unwrap()
      .catch((err) => {
        if (err.status === 401 && location.pathname !== '/') {
          deleteToken();
          history.push('/login');
          setTimeout(() => {
            toast.error('😥 로그인 해주세요');
          }, 1000);
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
  }, [location]);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
