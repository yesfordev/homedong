import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// style
import styled from 'styled-components';
import { motion } from 'framer-motion';
// import { Container } from '@material-ui/core';

// feature
import Navbar from '../../common/navbar/Navbar';
import RankTable from './RankTable';

// images
import Burpee from '../../assets/burpee.svg';
import Pushup from '../../assets/pushup.svg';
import Squat from '../../assets/squat.svg';

// action
import { loadRank } from './rankSlice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0px 0px 0px;
  height: 100vh;
  overflow-y: scroll;
`;

const Title = styled(motion.p)`
  font-size: 2rem;
  font-weight: 600;
  margin: 20px 0;

  @media (max-width: 414px) {
    font-size: 1.5rem;
`;
const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;
const ImageContainer = styled(motion.img)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0px 15px;
  cursor: pointer;
  width: 40%;
  @media (max-width: 414px) {
    width: 90%;
    margin: 0px 10px;
  }
`;

function Rank() {
  const [exercise, setExercise] = useState(1);
  const title = ['스쿼트', '팔굽혀펴기', '버피'];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRank(exercise));
  }, [exercise]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <ImagesContainer>
          <ImageContainer
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExercise(1)}
            src={Squat}
            alt="squat"
          />
          <ImageContainer
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExercise(3)}
            src={Burpee}
            alt="burpee"
          />
          <ImageContainer
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setExercise(2)}
            src={Pushup}
            alt="pushup"
          />
        </ImagesContainer>
        <Title layout>{title[exercise - 1]}</Title>
        <RankTable />
      </Wrapper>
    </>
  );
}

export default Rank;
