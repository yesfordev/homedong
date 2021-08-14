import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../../common/navbar/Navbar';
import Kind from './Kind';
import quickstart from '../../assets/quickstart.svg';
import burpee from '../../assets/burpee.svg';
import pushup from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';

const Wrapper = styles.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextWrapper = styles.div`
  height: 20vh;
  display: flex;
  justify-content: center;
`;

const QuickImage = styles.img`
  width: 500px;
  height: 200px;
`;

const StartWrapper = styles.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const kindLists = [
  {
    source: pushup,
    title: '팔굽혀펴기',
    link: '/game',
  },
  {
    source: burpee,
    title: '버피',
    link: '/burpee',
  },
  {
    source: squat,
    title: '스쿼트',
    link: '/squat',
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
