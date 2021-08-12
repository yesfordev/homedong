import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from '../api/isAuthenticated';

export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
