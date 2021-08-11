import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Button, makeStyles } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../authSlice';
import logo from '../../../assets/logo(angled).svg';

// style

const Wrapper = styled(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled(Container)`
  width: 50%;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled(Container)`
  width: 50%;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UseStyles = makeStyles({
  text: {
    backgroundColor: '#eee',
  },
});

export const CommonButton = styled(Button)`
  width: 100%;
  border-radius: 6px;
  margin: 1em 0 0.25em;
  padding: 0.3em 1em;
  background: ${(props) => (props.yellow ? '#fbd14b' : '#9fa9d8')};
  color: ${(props) => (props.mauve ? 'white' : 'black')};
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
      <LogoWrapper>
        <Logo to="/" src={logo} />
      </LogoWrapper>

      <LoginWrapper>
        <LoginContainer>
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
              className={UseStyles.text}
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
              className={UseStyles.text}
            />
            <CommonButton yellow type="submit">
              로그인
            </CommonButton>
            <Link to="/signup">
              <CommonButton mauve>회원가입</CommonButton>
            </Link>
          </ValidatorForm>
        </LoginContainer>
      </LoginWrapper>
    </Wrapper>
  );
}
