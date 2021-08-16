import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import isAuthenticated from '../api/isAuthenticated';
import { loadUser } from '../../features/auth/authSlice';
import { deleteToken } from '../api/JWT-common';

export default function AdminRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isAdmin, user } = useSelector((state) => state.auth);
  console.log(isAdmin, user, 'isAdmin');
  useEffect(() => {
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
        isAuthenticated() && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
