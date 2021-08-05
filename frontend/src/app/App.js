import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

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

// routes
import PrivateRoute from '../common/Routes/PrivateRoute';
import PublicRoute from '../common/Routes/PublicRoute';

// action
// import { loadUser } from './features/auth/authSlice';

const Wrapper = styled.div`
  background-color: rgba(246, 245, 253, 1);
`;

// function checkPageChanged() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   // location이 변화할 때마다 jwt 상태 체크
//   useEffect(() => {
//     dispatch(loadUser());
//   }, [location]);
//   console.log('페이지변화하여 jwt체크');
// }

function App() {
  // page가 변화는 지 체크해서 jwt 상태를 체크해주는 함수
  // checkPageChanged();
  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <PublicRoute restricted path="/login" component={Login} />
            <PublicRoute restricted path="/signup" component={SignUp} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/tutorial" component={MyPage} />
            <PrivateRoute path="/rank" component={MyPage} />
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
