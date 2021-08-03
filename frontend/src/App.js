import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import Login from './features/auth/login/Login';
import Home from './features/home/Home';
import GlobalStyles from './GlobalStyles';
import SignUp from './features/auth/signup/SignUp';

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
`;

function App() {
  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <GlobalStyles />
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/tutorial" />
          <Route path="/rank" />
        </BrowserRouter>
      </Wrapper>
    </StylesProvider>
  );
}

export default App;
