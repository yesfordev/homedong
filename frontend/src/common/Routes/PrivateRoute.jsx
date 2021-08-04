import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) =>
//   isAuthenticated ? <Component {...rest} /> : <Redirect to="/login" />;

function PrivateRoute({ component: Component, ...rest }) {
  // 문제
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
export default PrivateRoute;
