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

function Rank() {
  return (
    <div>
      <Navbar />
      <Wrapper>
        <h1>this is rank page</h1>
      </Wrapper>
    </div>
  );
}

export default Rank;
