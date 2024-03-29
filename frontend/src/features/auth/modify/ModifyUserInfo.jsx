import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import { deleteToken } from '../../../common/api/JWT-common';
import { CommonButton, CommonTextValidator } from '../login/Login';
import logo from '../../../assets/logo.svg';

import {
  checkNickname,
  modifyNickname,
  modifyPassword,
  setNicknameCheckedFalse,
} from '../authSlice';

// style
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  flex: 0.4;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 400px;
  height: 100px;
`;

const ModifyContainer = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  font-size: 2rem;
  margin-top: -20px;
  margin-bottom: 25px;
`;

const ChangeButton = styled(CommonButton)`
  margin-bottom: 30px;
`;

const useStyles = makeStyles({
  validatorForm: {
    width: '40%',
  },
});

// logic
export default function ModifyUserInfo() {
  // local state
  const [newNickname, setNickname] = useState('');
  const [newPassword, setPassword] = useState('');
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  const { isNicknameChecked } = useSelector((state) => state.auth);
  const [isValidInputNickname, setIsValidInputNickname] = useState(false);
  const errRef = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (isNicknameChecked || !newNickname || errRef.current.invalid[0]) {
        setIsValidInputNickname(false);
      } else {
        setIsValidInputNickname(true);
      }
    }, 10);
  }, [newNickname, errRef.current, isNicknameChecked]);

  // setState when user change input
  function handleNickname(event) {
    const { value } = event.target;
    if (isNicknameChecked) {
      dispatch(setNicknameCheckedFalse());
    }
    if (value.length < 7) {
      setNickname(value.trim());
      return true;
    }
    return false;
  }

  function doCheckNickname() {
    if (newNickname) {
      dispatch(checkNickname(newNickname))
        .unwrap()
        .then(() => {
          toast.success('😀 사용가능한 닉네임입니다');
        })
        .catch((err) => {
          if (err.status === 400) {
            toast.error('😥 입력한 정보를 다시 확인해주세요');
          } else if (err.status === 409) {
            toast.error('😥 이미 존재하는 닉네임입니다');
          } else if (err.status === 500) {
            history.push('/error');
          }
        });
    }
  }

  // submit when user click button
  function handleSubmit(event) {
    event.preventDefault();
    const { name } = event.target;
    const data = {
      newNickname,
      newPassword,
    };
    return name === 'nickname'
      ? dispatch(modifyNickname(data))
          .unwrap()
          .then(() => {
            toast.success('😀 닉네임 변경이 완료되었습니다');
          })
          .catch((err) => {
            if (err.status === 400) {
              toast.error('😀 입력한 정보를 다시 확인해주세요');
            } else if (err.status === 401) {
              toast.error('😥 로그인을 다시 해주세요!');
              deleteToken();
              history.push('/login');
            } else if (err.status === 409) {
              toast.error('😀 이미 존재하는 닉네임입니다');
            } else if (err.status === 404) {
              toast.error('😥 로그인을 다시 해주세요');
              deleteToken();
              history.push('/login');
            } else if (err.status === 500) {
              history.push('/error');
            }
          })
      : dispatch(modifyPassword(data))
          .unwrap()
          .then(() => {
            deleteToken();
            history.push('/');
            toast.success(
              '😀비밀번호 수정이 완료되었습니다. 다시 로그인해주세요'
            );
          })
          .catch((err) => {
            if (err.status === 400) {
              toast.error('😀 입력한 정보를 다시 확인해주세요');
            } else if (err.status === 401) {
              toast.error('😥 로그인을 다시 해주세요!');
              deleteToken();
              history.push('/login');
            } else if (err.status === 404) {
              toast.error('😥 로그인을 다시 해주세요');
              deleteToken();
              history.push('/login');
            } else if (err.status === 500) {
              history.push('/error');
            }
          });
  }

  // validation (same password)
  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== newPassword) {
        setIsPasswordSame(false);
        return false;
      }
      setIsPasswordSame(true);
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
  }, [newNickname]);

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo
          src={logo}
          onClick={() => {
            history.push('/');
          }}
        />
      </LogoWrapper>

      <ModifyContainer>
        <Title>회원정보수정</Title>
        <ValidatorForm
          onSubmit={handleSubmit}
          className={classes.validatorForm}
          name="nickname"
        >
          <CommonTextValidator
            label="닉네임"
            onChange={handleNickname}
            color="secondary"
            name="nickname"
            value={newNickname}
            validators={['required', 'matchRegexp:^[가-힣|a-z|A-Z|0-9|]+$']}
            errorMessages={[
              '닉네임을 입력해주세요',
              '한글,영문,숫자만 입력해주세요',
            ]}
            helperText="최대 6글자입니다."
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            size="small"
            fullWidth
            ref={errRef}
          />
          <CommonButton
            mauve="true"
            onClick={doCheckNickname}
            disabled={
              isNicknameChecked || !newNickname || !isValidInputNickname
            }
          >
            닉네임 중복확인
          </CommonButton>
          <ChangeButton type="submit" disabled={!isNicknameChecked}>
            닉네임 변경하기
          </ChangeButton>
        </ValidatorForm>
        <ValidatorForm
          onSubmit={handleSubmit}
          className={classes.validatorForm}
          name="password"
        >
          <CommonTextValidator
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            value={newPassword}
            validators={[
              'required',
              'matchRegexp:^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*[~!@#$%^&()+|=]).{8,16}$',
            ]}
            errorMessages={[
              '비밀번호를 입력해주세요',
              '영어, 숫자, 특수문자(~!@#$%^&()+|=)를 적어도 한 개 이상 포함해주세요(8~16자)',
            ]}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            size="small"
            fullWidth
          />
          <CommonTextValidator
            label="비밀번호 확인"
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            validators={['isPasswordMatch', 'required']}
            errorMessages={[
              '비밀번호가 일치하지 않습니다',
              '비밀번호를 입력해주세요',
            ]}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
          />
          <CommonButton
            disabled={!newPassword || !isPasswordSame}
            mauve="true"
            type="submit"
          >
            비밀번호 변경하기
          </CommonButton>
        </ValidatorForm>
      </ModifyContainer>
    </Wrapper>
  );
}
