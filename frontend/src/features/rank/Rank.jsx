import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import Navbar from '../../common/navbar/Navbar';
import RankTable from './RankTable';
import { ReactComponent as Situp } from '../../assets/situp.svg';
import { ReactComponent as Pushup } from '../../assets/pushup.svg';
import { ReactComponent as Squat } from '../../assets/squat.svg';

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0px 0px 0px;
  height: 200vh;
  width: 100%;
`;

const Title = styled.p`
  font-weight: 600;
  margin-top: 15px;
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
  return (
    <>
      <Navbar />
      <Wrapper>
        <ImagesContainer>
          <ImageContainer>
            <Situp width="150px" height="auto" alt="situp" />
            <Title>윗몸일으키기</Title>
          </ImageContainer>
          <ImageContainer>
            <Pushup width="150px" height="auto" alt="pushup" />
            <Title>팔굽혀펴기</Title>
          </ImageContainer>
          <ImageContainer>
            <Squat width="150px" height="auto" alt="squat" />
            <Title>스쿼트</Title>
          </ImageContainer>
        </ImagesContainer>
        <RankTable />
      </Wrapper>
    </>
  );
}

export default Rank;
