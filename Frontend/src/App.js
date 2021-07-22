import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from './features/signup/SignUp';
import Home from './features/home/Home';

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
  height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
