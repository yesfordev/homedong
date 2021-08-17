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
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 50px;

  @media (max-width: 762px) {
    font-size: 1.5rem;
  }
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

export default function Error500() {
  return (
    <Wrapper>
      <Logo src={logo} width="60vh" alt="logo" />
      <TitleWrapper>
        <Title>알 수 없는 에러가 발생하였습니다</Title>
      </TitleWrapper>
      <div>
        <CommonButton mauve="true">
          <Link to="/">홈으로</Link>
        </CommonButton>
      </div>
    </Wrapper>
  );
}
