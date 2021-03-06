import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// style
import { StylesProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from './GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// features
import Login from '../features/auth/login/Login';
import SignUp from '../features/auth/signup/SignUp';
import MyPage from '../features/mypage/MyPage';
import CheckPassword from '../features/auth/modify/CheckPassword';
import ModifyUserInfo from '../features/auth/modify/ModifyUserInfo';
import Home from '../features/home/Home';
import EmailCheckedPlease from '../features/auth/signup/EmailCheckedPlease';
import Tutorial from '../features/tutorial/Tutorial';
import EmailChecked from '../features/auth/signup/EmailChecked';
import Rank from '../features/rank/Rank';
import Game from '../features/game/Game';
import Error404 from '../common/error/Error404';
import Error500 from '../common/error/Error500';
import Admin from '../features/admin/Admin';

// routes
import PrivateRoute from '../common/routes/PrivateRoute';
import PublicRoute from '../common/routes/PublicRoute';
import AdminRoute from '../common/routes/AdminRoute';

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
`;

const StyledToastContainer = styled(ToastContainer).attrs({})`
  .Toastify__toast--error {
    font-size: 0.8rem;
    line-height: 1.5;
    word-break: keep-all;
  }
  .Toastify__toast--success {
    background-color: rgba(106, 96, 169, 0.7);
    font-size: 0.8rem;
    line-height: 1.5;
    word-break: keep-all;
    & .Toastify__progress-bar--success {
    }
  }
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
            <PublicRoute path="/tutorial" component={Tutorial} />
            <Route path="/emailcheckedplease" component={EmailCheckedPlease} />
            <Route path="/emailchecked" component={EmailChecked} />
            <Route path="/error" component={Error500} />
            <PrivateRoute exact path="/" component={Home} />
            <AdminRoute exact path="/admin" component={Admin} />
            <PrivateRoute path="/tutorial" component={Tutorial} />
            <PrivateRoute path="/rank" component={Rank} />
            <PrivateRoute path="/mypage" component={MyPage} />
            <PrivateRoute path="/checkpassword" component={CheckPassword} />
            <PrivateRoute path="/modifyuserinfo" component={ModifyUserInfo} />
            <PrivateRoute path="/game" component={Game} />
            <Route path="*" component={Error404} />
          </Switch>
        </BrowserRouter>
        <StyledToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </Wrapper>
    </StylesProvider>
  );
}

export default App;
