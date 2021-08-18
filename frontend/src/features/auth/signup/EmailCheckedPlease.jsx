import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo(angled).svg';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 800px;

  @media (max-width: 762px) {
    width: 60%;
  }
`;

const Title = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  word-break: keep-all;
  white-space: pre-wrap;
  text-align: center;
`;

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

export default function EmailCheckedPlease() {
  return (
    <Wrapper>
      <Logo src={logo} width="60vh" alt="logo" />
      <Title>
        HOMEDONG 회원가입을 축하드립니다🎉 <br /> <br />
        모든 서비스를 이용하기 위해 이메일 인증을 완료하여 주세요
      </Title>
      <br />
      <div>
        <CommonButton mauve="true">
          <Link to="/login">로그인 하러 가기</Link>
        </CommonButton>
      </div>
    </Wrapper>
  );
}
