import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import SignUp from './features/signup/SignUp';
import Home from './features/home/Home';

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
`;

function App() {
  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/tutorial" />
          <Route path="/rank" />
        </BrowserRouter>
      </Wrapper>
    </StylesProvider>
  );
}

export default App;
