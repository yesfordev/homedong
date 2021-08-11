import React, { useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import LogoImage from '../../assets/logo.svg';

const Wrapper = styled.div``;

const Exercise = styled.section`
  height: 100vh;
`;

const Logo = styled.img``;

export default function Tutorial() {
  useEffect(() => {
    scroll.scrollTo(0);
  }, []);
  return (
    <Wrapper>
      <Exercise name="element1">
        <Logo src={LogoImage} alt="logo" />
        <Link to="element2" activeClass="active" spy smooth duration={1000}>
          <Button variant="contained" color="primary">
            팔굽혀펴기
          </Button>
        </Link>
        <Link to="element3" activeClass="active" spy smooth duration={1000}>
          <Button variant="contained" color="secondary">
            버피
          </Button>
        </Link>
      </Exercise>
      <Exercise name="element2">
        <Logo src={LogoImage} alt="logo" />
        <Link to="element1" activeClass="active" spy smooth duration={1000}>
          <Button variant="contained" color="info">
            스쿼트
          </Button>
        </Link>
        <Link to="element3" activeClass="active" spy smooth duration={1000}>
          <Button variant="contained" color="secondary">
            버피
          </Button>
        </Link>
      </Exercise>
      <Exercise name="element3">
        <Logo src={LogoImage} alt="logo" />
        <Link to="element2" activeClass="active" spy smooth duration={1000}>
          <Button variant="contained" color="primary">
            팔굽혀펴기
          </Button>
        </Link>
        <Link to="element1" activeClass="active" spy smooth duration={1000}>
          <Button variant="contained" color="info">
            스쿼트
          </Button>
        </Link>
      </Exercise>
    </Wrapper>
  );
}
