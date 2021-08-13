import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/src/styles/styles.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo(basic).svg';

const Wrapper = styled.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 0.5);
`;

const HeaderWrapper = styled.div`
  margin: 0 2em 0 2em;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 100px;
`;

const LeftList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin-right: 10px;
    margin-left: 10px;
  }
  > button {
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Buttons = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin-right: 10px;
    margin-left: 10px;
  }
  > button {
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default function Navbar() {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Link to="/">
          <Logo src={logo} />
        </Link>
        <LeftList>
          <span>방번호/종목</span>
          <AwesomeButton size="icon" type="github">
            MIC
          </AwesomeButton>
        </LeftList>

        <Buttons>
          <span>타이머</span>
          <AwesomeButton type="instagram">게임시작</AwesomeButton>
          <AwesomeButton type="github">나가기</AwesomeButton>
        </Buttons>
      </HeaderWrapper>
    </Wrapper>
  );
}
