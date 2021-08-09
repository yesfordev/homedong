import React from 'react';
import styles from 'styled-components';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Navbar from '../../common/navbar/Navbar';
import Kind from './Kind';
import pushup from '../../assets/pushup.svg';
import situp from '../../assets/situp.svg';
import squat from '../../assets/squat.svg';

const Wrapper = styles(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const kindLists = [
  {
    source: pushup,
    title: '팔굽혀펴기',
    link: '/pushup',
  },
  {
    source: situp,
    title: '윗몸일으키기',
    link: '/situp',
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
