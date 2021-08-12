import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo(angled).svg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0;
  margin: 0;
`;

const Logo = styled.img`
  width: 600px;

  @media (max-width: 762px) {
    width: 60%;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  width: 50%;
`;

const Title = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 50px;

  @media (max-width: 762px) {
    font-size: 1.5rem;
  }
`;

export default function Error404() {
  return (
    <Wrapper>
      <Logo src={logo} width="60vh" alt="logo" />
      <TitleWrapper>
        <Title>알 수 없는 에러가 발생하였습니다</Title>
      </TitleWrapper>
      <Link to="/">
        <Button variant="contained" color="primary">
          홈으로
        </Button>
      </Link>
    </Wrapper>
  );
}
