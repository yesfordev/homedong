import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

// 메서드 전체 REST API, params 필요
// 회원가입
export const signup = createAsyncThunk('SIGNUP', async (userInfo) => {
  await axios
    .post('/signup', userInfo)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

// 닉네임 중복 검사
export const checkNickname = createAsyncThunk(
  'CHECK_NICKNAME',
  async (nickname) => {
    await axios
      .get('/checknickname', nickname)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
);

// 로그인
export const login = createAsyncThunk('LOGOUT', async (userInfo) => {
  await axios
    .post('/login', userInfo)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

// 로그아웃
export const logout = createAsyncThunk('LOGOUT', async (userId) => {
  await axios
    .post('/logout', userId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

// 닉네임 변경
export const modifyNickname = createAsyncThunk(
  'MODIFY_NICKNAME',
  async (userInfo) => {
    console.log('닉네임 변경', userInfo);
    await axios
      .put('/modifynickname', userInfo)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
);

// 비밀번호 변경
export const modifyPassword = createAsyncThunk(
  'MODIFY_PASSWORD',
  async (userInfo) => {
    console.log('비밀번호 변경', userInfo);
    await axios
      .put('/modifypassword', userInfo)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
);

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      nickname: '김싸피',
      email: 'abc@naver.com',
    },
  },
  reducers: {},
  // 조사 필요, return 값 찾아야함
  // fullfilled -> 완료되었을 때 무슨 일을 할지? (signup은 로그인 시켜준다, 이런것?)
  extraReducers: {
    [signup.fulfilled]: (state) => [...state],
    [checkNickname.fullfilled]: () => [],
    [login.fullfilled]: () => [],
    [logout.fullfilled]: () => [],
    [modifyNickname.fullfilled]: () => [],
    [modifyPassword.fullfilled]: () => [],
  },
});

// export const { signup } = signUpSlice.actions;
// export const userSelector = (state) => state.user;
export default authSlice.reducer;
