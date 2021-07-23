import React, { useState } from 'react';
import styles from 'styled-components';
import { Link } from 'react-router-dom';
import SimpleModal from './modal';

const Wrapper = styles.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 1);
`;

const Logo = styles.div`
  width: 50px;
  height: 100%;
  background-image: url(https://picsum.photos/50/65)
`;

const Links = styles.ul`
  & > * {
    margin-right: 25px;
  } > span
  {
    cursor: pointer;
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  console.log(setIsOpen);
  return (
    <Wrapper>
      <Logo />
      <Links>
        <Link to="/tutorial">튜토리얼</Link>
        <span>방만들기</span>
        <span>방찾기</span>
        <SimpleModal isOpen={isOpen} />
        <Link to="/ranking">랭킹</Link>
      </Links>
    </Wrapper>
  );
}

export default Navbar;
