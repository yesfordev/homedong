import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MakeRoomModal from './MakeRoomModal';
import FindRoomModal from './FindRoomModal';
import DropDownMenu from './NavbarDropdown';

const Wrapper = styled.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 1);
`;

const Logo = styled(Link)`
  width: 50px;
  height: 100%;
  background-image: url(https://picsum.photos/50/65);
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
      <Logo to="/" />
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
        <Link to="/tutorial">튜토리얼</Link>
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
