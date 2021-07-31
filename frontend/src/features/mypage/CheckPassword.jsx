import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import styled from 'styled-components';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

// style
const Wrapper = styled(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1rem;
  margin-bottom: 25px;
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function CheckPassword() {
  const [password, setPassword] = useState('');
  const history = useHistory();

  // function
  function handleSubmit(e) {
    e.preventDefault();
    history.push('/modifyuserinfo');
  }

  return (
    <Wrapper>
      <PasswordContainer>
        <ValidatorForm onSubmit={handleSubmit}>
          <Title>비밀번호</Title>
          <TextValidator
            label="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type="password"
            validators={['required']}
            errorMessages={['비밀번호 입력해주세요']}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit">제출하기</Button>
        </ValidatorForm>
      </PasswordContainer>
    </Wrapper>
  );
}

export default CheckPassword;
