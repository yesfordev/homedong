import React from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import Navbar from '../../common/navbar/Navbar';

const Wrapper = styled(Container)`
  display: flex;
  padding: 65px 0px 0px 0px;
  height: 200vh;
  width: 100%;
`;

function Tutorial() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <h1>this is tutorial page!</h1>
      </Wrapper>
    </>
  );
}

export default Tutorial;
