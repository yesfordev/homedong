import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '@material-ui/core';
import ReactFullpage from '@fullpage/react-fullpage';
import LogoImage from '../../assets/logo.svg';

const Wrapper = styled(Container)`
  .fp-tableCell {
    display: flex;
    flex-direction: column;
  }
`;

const Exercise = styled.section``;

const Logo = styled.img``;

function Tutorial() {
  return (
    <>
      <ReactFullpage
        // fullpage options
        scrollingSpeed={1000} /* Options here */
        render={({ fullpageApi }) => {
          return (
            <Wrapper>
              <Exercise className="section">
                <Logo src={LogoImage} />
                <h1>스쿼트</h1>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => fullpageApi.moveTo(2)}
                >
                  윗몸일으키기
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  fullWidth={false}
                  onClick={() => fullpageApi.moveTo(3)}
                >
                  팔굽혀펴기
                </Button>
              </Exercise>
              <Exercise className="section">
                <Logo src={LogoImage} />
                <h1>윗몸일으키기</h1>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => fullpageApi.moveTo(1)}
                >
                  스쿼트
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => fullpageApi.moveTo(3)}
                >
                  팔굽혀펴기
                </Button>
              </Exercise>
              <Exercise className="section">
                <Logo src={LogoImage} />
                <h1>팔굽혀펴기</h1>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => fullpageApi.moveTo(1)}
                >
                  스쿼트
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => fullpageApi.moveTo(2)}
                >
                  윗몸일으키기
                </Button>
                <Button
                  variant="contained"
                  onClick={() => fullpageApi.moveTo(1)}
                >
                  Move top
                </Button>
              </Exercise>
            </Wrapper>
          );
        }}
      />
    </>
  );
}

export default Tutorial;
