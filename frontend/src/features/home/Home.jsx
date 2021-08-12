import React from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../../common/navbar/Navbar';
import Kind from './Kind';
import burpee from '../../assets/burpee.svg';
import pushup from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';

const Wrapper = styles.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const kindLists = [
  {
    source: pushup,
    title: '팔굽혀펴기',
    link: '/pushup',
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
        {kindLists.map((kindList) => {
          return (
            <Link to={kindList.link}>
              <Kind imgSrc={kindList.source} title={kindList.title} />
            </Link>
          );
        })}
      </Wrapper>
    </>
  );
}

export default Home;
