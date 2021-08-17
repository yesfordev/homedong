import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MakeRoomModal from './MakeRoomModal';
import FindRoomModal from './FindRoomModal';
import DropDownMenu from './NavbarDropdown';
import logo from '../../assets/logo(basic).svg';
import tutorial from '../../assets/tutorial.svg';
import makeroom from '../../assets/makeroom.svg';
import searchroom from '../../assets/searchroom.svg';
import ranking from '../../assets/ranking.svg';

const Wrapper = styled.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  align-items: center;
  border-bottom: solid rgba(248, 208, 83, 0.5);
  background-color: rgba(246, 245, 253, 1);
  z-index: 999;
`;

const HeaderWrapper = styled.div`
  margin: 0 0.5em 0 2em;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 100px;
`;

const List = styled.img`
  height: 45px;
`;

const Links = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin-right: 10px;
    margin-left: 10px;
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
      <HeaderWrapper>
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
            <List src={tutorial} />
          </Link>
          <button type="button" onClick={() => setIsMakeOpen(true)}>
            <List src={makeroom} />
          </button>
          <button type="button" onClick={() => setIsFindOpen(true)}>
            <List src={searchroom} />
          </button>
          <Link to="/rank">
            <List src={ranking} />
          </Link>
          <DropDownMenu />
        </Links>
      </HeaderWrapper>
    </Wrapper>
  );
}
