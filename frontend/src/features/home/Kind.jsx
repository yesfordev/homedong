import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 60%;
`;
const Title = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  max-width: 60%;
`;

function Kind({ imgSrc, title }) {
  return (
    <ImageContainer>
      <Image src={imgSrc} />
      <Title>{title}</Title>
    </ImageContainer>
  );
}

Kind.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Kind;
