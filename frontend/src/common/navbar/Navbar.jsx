import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MakeRoomModal from './MakeRoomModal';
import FindRoomModal from './FindRoomModal';
import DropDownMenu from './NavbarDropdown';
import logo from '../../assets/logo(not).svg';
import tutorial from '../../assets/tutorial.svg';

const Wrapper = styled.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 0.5);
`;

const Logo = styled.img`
  width: 100px;
  height: 100%;
`;

const Links = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin-right: 25px;
    cursor: pointer;
  }
  > button {
    font-size: 1rem;
  }
`;

export default function Navbar() {
  const [isMakeOpen, setIsMakeOpen] = useState(false);
  const [isFindOpen, setIsFindOpen] = useState(false);
  const handleMakeModal = () => setIsMakeOpen(false);
  const handleFindModal = () => setIsFindOpen(false);
  return (
    <Wrapper>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <MakeRoomModal
        fullWidth
        isOpen={isMakeOpen}
        handleModalClose={handleMakeModal}
      />
      <FindRoomModal
        fullWidth
        isOpen={isFindOpen}
        handleModalClose={handleFindModal}
      />
      <Links>
        <Link to="/tutorial">
          <Logo src={tutorial} />
        </Link>
        <button type="button" onClick={() => setIsMakeOpen(true)}>
          방만들기
        </button>
        <button type="button" onClick={() => setIsFindOpen(true)}>
          방찾기
        </button>
        <Link to="/rank">랭킹</Link>
        <DropDownMenu />
      </Links>
    </Wrapper>
  );
}
