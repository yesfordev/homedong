import React, { useState } from 'react';
import styles from 'styled-components';
import { Container, TextField, Button } from '@material-ui/core';

const Wrapper = styles(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styles.div`
  display: flex;
  flex-direction: column;
`;

const InputValidator = styles(TextField)`
  margin: 16px;
`;

const SubmitButton = styles(Button)`

`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Wrapper>
      <LoginContainer>
        <InputValidator
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <InputValidator
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <SubmitButton color="primary">로그인</SubmitButton>
      </LoginContainer>
    </Wrapper>
  );
}

export default Login;
