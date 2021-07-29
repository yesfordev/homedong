import React, { useState } from 'react';
import { Container, Button } from '@material-ui/core';
import styles from 'styled-components';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

// style
const Wrapper = styles(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Title = styles.div`
  font-size: 1rem;
  margin-bottom: 25px;
`;

const PasswordContainer = styles.div`
  display: flex;
  flex-direction: column;
`;

// function
function handleSubmit(e) {
  e.preventDefault();
}

function CheckPassword() {
  const [password, setPassword] = useState('');
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
          <Button>제출하기</Button>
        </ValidatorForm>
      </PasswordContainer>
    </Wrapper>
  );
}

export default CheckPassword;
