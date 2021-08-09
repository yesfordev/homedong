import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

// style
import { StylesProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
import GlobalStyles from './GlobalStyles';

// features
import Login from '../features/auth/login/Login';
import SignUp from '../features/auth/signup/SignUp';
import MyPage from '../features/mypage/MyPage';
import CheckPassword from '../features/mypage/CheckPassword';
import ModifyUserInfo from '../features/auth/modify/ModifyUserInfo';
import Home from '../features/home/Home';
import EmailChecked from '../features/auth/signup/EmailChecked';
import Tutorial from '../features/tutorial/Tutorial';
import Rank from '../features/rank/Rank';

// routes
import PrivateRoute from '../common/routes/PrivateRoute';
import PublicRoute from '../common/routes/PublicRoute';

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
`;

function App() {
  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <PublicRoute restricted path="/login" component={Login} />
            <PublicRoute restricted path="/signup" component={SignUp} />
            <Route path="/emailchecked" component={EmailChecked} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/tutorial" component={Tutorial} />
            <PrivateRoute path="/rank" component={Rank} />
            <PrivateRoute path="/mypage" component={MyPage} />
            <PrivateRoute path="/checkpassword" component={CheckPassword} />
            <PrivateRoute path="/modifyuserinfo" component={ModifyUserInfo} />
          </Switch>
        </BrowserRouter>
      </Wrapper>
    </StylesProvider>
  );
}

export default App;
