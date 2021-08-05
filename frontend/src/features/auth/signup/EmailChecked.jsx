import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '@material-ui/core';

const Wrapper = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function EmailChecked() {
  return (
    <Wrapper>
      <h1>이메일 인증이 완료되었습니다!</h1>
      <Button>로그인</Button>
    </Wrapper>
  );
}

export default EmailChecked;
