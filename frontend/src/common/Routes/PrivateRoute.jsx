import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import isAuthenticated from '../api/isAuthenticated';
import { loadUser } from '../../features/auth/authSlice';

export default function PrivateRoute({ component: Component, ...rest }) {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
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
