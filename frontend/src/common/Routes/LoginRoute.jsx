import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) =>
//   isAuthenticated ? <Component {...rest} /> : <Redirect to="/login" />;

function LoginRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
export default LoginRoute;
