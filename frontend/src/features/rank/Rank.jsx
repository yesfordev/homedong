import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// style
import styled from 'styled-components';
// import { Container } from '@material-ui/core';

// feature
import Navbar from '../../common/navbar/Navbar';
import RankTable from './RankTable';

// images
import { ReactComponent as Burpee } from '../../assets/burpee.svg';
import { ReactComponent as Pushup } from '../../assets/pushup.svg';
import { ReactComponent as Squat } from '../../assets/squat.svg';

// action
import { loadRank } from './rankSlice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0px 0px 0px;
  height: 200vh;
  width: 100%;
`;

const Title = styled.p`
  font-weight: 600;
  margin-bottom: 20px;
`;
const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0px 15px;
  cursor: pointer;
`;

function Rank() {
  const [exercise, setExercise] = useState(1);
  const title = ['스쿼트', '푸쉬업', '버피'];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRank(exercise));
  }, [exercise]);

  return (
    <>
      <Navbar />
      <Wrapper>
        <ImagesContainer>
          <ImageContainer onClick={() => setExercise(1)}>
            <Squat width="150px" height="200px" alt="squat" />
          </ImageContainer>
          <ImageContainer onClick={() => setExercise(2)}>
            <Pushup width="150px" height="200px" alt="pushup" />
          </ImageContainer>
          <ImageContainer onClick={() => setExercise(3)}>
            <Burpee width="150px" height="200px" alt="burpee" />
          </ImageContainer>
        </ImagesContainer>
        <Title>{title[exercise - 1]}</Title>
        <RankTable />
      </Wrapper>
    </>
  );
}

export default Rank;
