import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// style
import { StylesProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import GlobalStyles from './GlobalStyles';

// features
import Login from './features/auth/login/Login';
import Home from './features/home/Home';
import SignUp from './features/auth/signup/SignUp';
import PrivateRoute from './common/Routes/PrivateRoute';
import LoginRoute from './common/Routes/LoginRoute';
import { loadUser } from './features/auth/authSlice';

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
`;

function checkPageChanged() {
  const location = useLocation();
  const dispatch = useDispatch();
  // location이 변화할 때마다 jwt 상태 체크
  useEffect(() => {
    dispatch(loadUser());
  }, [location]);
  console.log('페이지변화하여 jwt체크');
}

function App() {
  // page가 변화는 지 체크해서 jwt 상태를 체크해주는 함수
  checkPageChanged();
  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <GlobalStyles />
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/tutorial" component={Home} />
          <PrivateRoute path="/rank" component={Home} />
        </Switch>
      </Wrapper>
    </StylesProvider>
  );
}

export default App;
