import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 50px;
`;

export const Title = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 2.5rem;
  border-bottom: 5px solid rgba(251, 209, 75, 0.5);
`;

export const Content = styled.div`
  font-size: 2rem;
  margin: 40px;
`;

const Container = styled.div``;

// style
export default function AdminInfo() {
  const { user } = useSelector((state) => state.auth);
  const { userId, nickname, email } = user;
  return (
    <Wrapper>
      <Container>
        <Title>회원번호</Title>
        <Content>{userId}</Content>
      </Container>
      <Container>
        <Title>닉네임</Title>
        <Content>{nickname}</Content>
      </Container>
      <Container>
        <Title>이메일</Title>
        <Content>{email}</Content>
      </Container>
    </Wrapper>
  );
}
