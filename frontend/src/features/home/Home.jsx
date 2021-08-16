import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../../common/navbar/Navbar';
import Kind from './Kind';
import quickstart from '../../assets/quickstart.svg';
import burpee from '../../assets/burpee.svg';
import pushup from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
`;

const QuickImage = styled.img`
  width: 500px;
  height: 200px;
`;

const StartWrapper = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const kindLists = [
  {
    source: squat,
    title: '스쿼트',
    link: '/squat',
  },
  {
    source: burpee,
    title: '버피',
    link: '/burpee',
  },
  {
    source: pushup,
    title: '팔굽혀펴기',
    link: '/game',
  },
];

function Home() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <TextWrapper>
          <QuickImage src={quickstart} />
        </TextWrapper>
        <StartWrapper>
          {kindLists.map((kindList) => {
            return (
              <Link to={kindList.link}>
                <Kind imgSrc={kindList.source} title={kindList.title} />
              </Link>
            );
          })}
        </StartWrapper>
      </Wrapper>
    </>
  );
}

export default Home;
