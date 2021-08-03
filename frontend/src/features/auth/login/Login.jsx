import React, { useState } from 'react';
import styles from 'styled-components';
import { Container, Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../authSlice';

// style

const Wrapper = styles(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Title = styles.span`
  font-size: 2.5rem;
`;

const LoginContainer = styles.div`
  display: flex;
  flex-direction: column;
`;

// component
function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // function
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(login(data))
      .unwrap()
      .then(() => history.push('/'));
    console.log('컴포넌트', data);
  }

  // render
  return (
    <Wrapper>
      <LoginContainer>
        <Title>LOGO</Title>
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            label="이메일"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={[
              '정보를 입력해주세요',
              '이메일 형식으로 입력해주세요',
            ]}
            variant="outlined"
            autoFocus
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextValidator
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type="password"
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit">로그인</Button>
        </ValidatorForm>
      </LoginContainer>
    </Wrapper>
  );
}

export default Login;
