import { useState, React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import { signup, checkNickname } from '../authSlice';

// style
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  height: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.span`
  font-size: 2.5rem;
`;

const useStyles = makeStyles({
  validatorForm: {
    width: '35%',
  },
});

// logic
function SignUp() {
  // local state
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  // setState when user change input
  function handleNickname(event) {
    const { value } = event.target;
    if (value.length < 7) {
      setNickname(value);
      return true;
    }
    return false;
  }
  // submit when user click button
  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email,
      nickname,
      password,
    };
    dispatch(signup(data));
  }

  // validation (same password)
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, [repeatPassword]);

  // validation (maxlength)
  useEffect(() => {
    ValidatorForm.addValidationRule('maxNumber', (value) => {
      if (value.length > 6) {
        return false;
      }
      return true;
    });
  }, [nickname]);

  return (
    <Wrapper>
      <LoginContainer>
        <Title>LOGO</Title>
        <ValidatorForm
          onSubmit={handleSubmit}
          className={classes.validatorForm}
        >
          <TextValidator
            label="닉네임"
            onChange={handleNickname}
            color="secondary"
            name="nickname"
            value={nickname}
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            helperText="최대 6글자입니다."
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            size="small"
            fullWidth
          />
          <Button onClick={() => dispatch(checkNickname(nickname))}>
            중복확인
          </Button>
          <TextValidator
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            validators={['required', 'isEmail']}
            errorMessages={['정보를 입력해주세요', 'email is not valid']}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextValidator
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            value={password}
            validators={['required']}
            errorMessages={['정보를 입력해주세요']}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextValidator
            label="비밀번호 확인"
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            validators={['isPasswordMatch', 'required']}
            errorMessages={[
              '비밀번호가 일치하지 않습니다',
              '정보를 입력해주세요',
            ]}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
          />
          <Button type="submit">Submit</Button>
        </ValidatorForm>
      </LoginContainer>
    </Wrapper>
  );
}

export default SignUp;
