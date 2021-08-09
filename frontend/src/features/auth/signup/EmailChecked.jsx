import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImage } from '../../../assets/logo.svg';

const Wrapper = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(LogoImage)`
  width: 80%;
`;

const Title = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  word-break: keep-all;
  white-space: pre-wrap;
`;

export default function EmailChecked() {
  return (
    <Wrapper>
      <Logo />
      <Title>
        이메일 인증이 완료되었습니다😀 로그인 버튼을 클릭하여 로그인 후 서비스
        이용부탁드립니다
      </Title>
      <Button color="primary" variant="contained">
        <Link to="/login">로그인</Link>
      </Button>
    </Wrapper>
  );
}
