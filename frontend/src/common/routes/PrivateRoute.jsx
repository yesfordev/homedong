import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import isAuthenticated from '../api/isAuthenticated';
import { loadUser } from '../../features/auth/authSlice';
import { deleteToken } from '../api/JWT-common';

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err) => {
        if (err.status === 401) {
          deleteToken();
          history.push('/login');
          setTimeout(() => {
            toast.error('😥 로그인 해주세요');
          }, 1000);
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
