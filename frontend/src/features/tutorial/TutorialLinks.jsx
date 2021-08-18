import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import burpee from '../../assets/burpee.svg';
import pushup from '../../assets/pushup.svg';
import squat from '../../assets/squat.svg';

const Icons = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
const CustomLink = styled(Link)`
  display: contents;
`;
const IconButton = styled(motion.img)`
  width: 5%;
`;

export default function TutorialLinks() {
  return (
    <Icons>
      <CustomLink to="element1" activeClass="active" spy smooth duration={1000}>
        <IconButton
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          src={squat}
        />
      </CustomLink>
      <CustomLink to="element2" activeClass="active" spy smooth duration={1000}>
        <IconButton
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          src={burpee}
        />
      </CustomLink>
      <CustomLink to="element3" activeClass="active" spy smooth duration={1000}>
        <IconButton
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          src={pushup}
        />
      </CustomLink>
    </Icons>
  );
}
