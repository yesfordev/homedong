import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../authSlice';

// style

const Wrapper = styled(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2.5rem;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// component
export default function Login() {
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
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 400) {
          toast.error('😥 아이디와 비밀번호를 다시 한 번 확인 해주세요!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (err.status === 500) {
          history.push('/error');
        }
      });
  }

  // render
  return (
    <Wrapper>
      <LoginContainer>
        <Title>LOGO</Title>
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            label="이메일"
            onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
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
            onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
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
          <Link to="/signup">
            <Button>회원가입</Button>
          </Link>
        </ValidatorForm>
      </LoginContainer>
    </Wrapper>
  );
}
