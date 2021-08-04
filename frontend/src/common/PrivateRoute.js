import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) =>
//   isAuthenticated ? <Component {...rest} /> : <Redirect to="/login" />;

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
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
