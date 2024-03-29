import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Button, makeStyles } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteToken } from '../../../common/api/JWT-common';
import { login } from '../authSlice';
import logo from '../../../assets/logo(login).svg';
import tutorial from '../../../assets/tutorial.svg';

const Wrapper = styled(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled(Container)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 10px;
`;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CommonTextValidator = styled(TextValidator)`
  opacity: 0.8;
  width: 100%;
  height: 70px;
  font-size: 10px;
  font-color: #262626;
  padding: 1em 0 1em 0;
  border: red;

  & label {
    color: black;
    font-weight: bold;
  }

  & .MuiOutlinedInput-input {
    border-radius: 6px;
    background-color: #ffffff;
    padding: 0.6em;
  }

  & .MuiOutlinedInput-notchedOutline {
    opacity: 0;
  }
  margin-bottom: ${(props) => (props.islogininput ? '15px' : '0')};
`;

const useStyles = makeStyles({
  validatorForm: {
    width: '90%',
  },
  button: {
    background: 'linear-gradient(45deg, #ff859f 30%, #ffa87a 70%)',
    borderRadius: 7,
    border: 0,
    fontWeight: 'bold',
    color: 'white',
    height: 40,
    marginTop: '10px',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 70%)',
    },
  },
});

export const CommonButton = styled(Button)`
  width: 100%;
  border-radius: 6px;
  margin: 1em 0 0.25em;
  padding: 0.4em 1em;
  background: ${(props) => (props.yellow ? '#fbd14b' : '#9fa9d8')};
  color: ${(props) => (props.mauve ? 'white' : '#7a7a7a')};

  &:hover {
    background: ${(props) => (props.yellow ? '#ffce00' : '#8090d8')};
    color: ${(props) => (props.mauve ? 'white' : '#262626')};
  }

  &:disabled {
    opacity: 0.35;
    color: ${(props) => (props.mauve ? 'white' : 'black')};
  }
`;

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        if (err.status === 400) {
          toast.error('😥 입력하신 정보를 다시 확인해주세요');
        } else if (err.status === 409) {
          toast.error('😥 이미 로그인된 사용자입니다');
        } else if (err.status === 401) {
          toast.error('😥 아이디와 비밀번호를 다시 확인해주세요');
          deleteToken();
          history.push('/login');
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
        <Link to="/tutorial">
          <Button className={classes.button} src={tutorial}>
            튜토리얼
          </Button>
        </Link>
      </LogoWrapper>

      <LoginContainer>
        <ValidatorForm
          onSubmit={handleSubmit}
          className={classes.validatorForm}
        >
          <CommonTextValidator
            islogininput="true"
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
          <CommonTextValidator
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
          <CommonButton yellow="true" type="submit">
            로그인
          </CommonButton>
          <Link to="/signup">
            <CommonButton mauve="true">회원가입</CommonButton>
          </Link>
        </ValidatorForm>
      </LoginContainer>
    </Wrapper>
  );
}
