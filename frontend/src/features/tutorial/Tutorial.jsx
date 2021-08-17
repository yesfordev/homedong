/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import SimpleImageSlider from 'react-simple-image-slider';
import burpee from '../../assets/burpee.svg';
import pushup from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';
import badge from './images/badge.png';

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
  position: absolute;
  margin-top: 10%;
  left: 10%;
`;
const Text = styled.div`
  display: flex;
  position: absolute;
  margin-top: 37%;
  left: 15px;
  font-size: 30px;
  text-align: center;
`;

const IconButton = styled(motion.img)`
  width: 5%;
`;

const Icons = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    scroll.scrollTo(0);
  }

  render() {
    const images = [{ url: badge }, { url: badge }, { url: badge }];
    return (
      <>
        {/* <Navbar /> */}
        <Wrapper>
          <Exercise name="element1">
            <Text>
              준비 자세를 취해주세요
              <br />
              손바닥부터 얼굴까지 모두 화면에 들어와야합니다.
            </Text>
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
            <div>
              <SimpleImageSlider
                width={600}
                height={600}
                images={images}
                style={{
                  position: 'absolute',
                  marginTop: '5%',
                  right: '10%',
                }}
                background="transparent"
                showBullets
                showNavs
              />
            </div>
            <Link to="element2" activeClass="active" spy smooth duration={1000}>
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
          <Exercise name="element2">
            <Text>
              준비 자세를 취해주세요
              <br />
              손바닥부터 얼굴까지 모두 화면에 들어와야합니다.
            </Text>
            <Icons>
              <IconButton src={squat} />
              <IconButton src={pushup} />
              <IconButton src={burpee} />
            </Icons>
            <Logo src={squat} alt="logo" />
            <Link to="element1" activeClass="active" spy smooth duration={1000}>
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
          <Exercise name="element3">
            <Text>
              준비 자세를 취해주세요
              <br />
              손바닥부터 얼굴까지 모두 화면에 들어와야합니다.
            </Text>
            <Icons>
              <IconButton src={squat} />
              <IconButton src={pushup} />
              <IconButton src={burpee} />
            </Icons>
            <Logo src={burpee} alt="logo" />
            <Link to="element1" activeClass="active" spy smooth duration={1000}>
              <Button variant="contained" color="primary">
                팔굽혀펴기
              </Button>
            </Link>
            <Link to="element2" activeClass="active" spy smooth duration={1000}>
              <Button variant="contained" color="info">
                스쿼트
              </Button>
            </Link>
          </Exercise>
        </Wrapper>
      </>
    );
  }
}
export default Tutorial;
