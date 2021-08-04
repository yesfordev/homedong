import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// style
import { StylesProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';

// features
import Login from './features/auth/login/Login';
import Home from './features/home/Home';
import SignUp from './features/auth/signup/SignUp';
import PrivateRoute from './common/PrivateRoute';

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
`;

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log('login?', isLoggedIn);

  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <GlobalStyles />
        <BrowserRouter>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute
            isAuthenticated={isLoggedIn}
            exact
            path="/"
            component={Home}
          />
          <PrivateRoute isAuthenticated={isLoggedIn} path="/tutorial" />
          <PrivateRoute isAuthenticated={isLoggedIn} path="/rank" />
        </BrowserRouter>
      </Wrapper>
    </StylesProvider>
  );
}

export default App;
