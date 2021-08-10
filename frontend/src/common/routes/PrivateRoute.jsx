import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import isAuthenticated from '../api/isAuthenticated';
import { loadUser } from '../../features/auth/authSlice';

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err) => {
        if (err.status === 401) {
          toast.error('😥 로그인 해주세요');
          history.push('/login');
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
