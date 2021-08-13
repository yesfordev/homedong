import React, { useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import burpee from '../../assets/burpee.svg';
import pushup from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';
// import LogoImage from '../../assets/logo.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Exercise = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Logo = styled.img`
  height: 50%;
`;

const IconButton = styled(motion.img)`
  width: 5%;
`;

const Icons = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

export default function Tutorial() {
  useEffect(() => {
    scroll.scrollTo(0);
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      <Wrapper>
        <Exercise name="element1">
          <Icons>
            <IconButton
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              src={squat}
            />
            <IconButton
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              src={pushup}
            />
            <IconButton
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              src={burpee}
            />
          </Icons>
          <Logo src={pushup} alt="logo" />
          {/* <Link to="element2" activeClass="active" spy smooth duration={1000}>
          <Button variant="contained" color="primary">
            팔굽혀펴기
          </Button>
        </Link>
        <Link to="element3" activeClass="active" spy smooth duration={1000}>
          <Button variant="contained" color="secondary">
            버피
          </Button>
          <Button variant="contained" color="info">
            스쿼트
          </Button>
        </Link> */}
        </Exercise>
        <Exercise name="element2">
          <Icons>
            <IconButton src={squat} />
            <IconButton src={pushup} />
            <IconButton src={burpee} />
          </Icons>
          <Logo src={squat} alt="logo" />
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
          <Icons>
            <IconButton src={squat} />
            <IconButton src={pushup} />
            <IconButton src={burpee} />
          </Icons>
          <Logo src={burpee} alt="logo" />
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
    </>
  );
}
