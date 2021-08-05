import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken } from '../../common/api/JWT-common';
import axios from '../../common/api/http-common';

// 메서드 전체 REST API, params 필요
// 회원가입
export const signup = createAsyncThunk(
  'SIGNUP',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signup', userInfo);
      console.log('action');
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 닉네임 중복 검사
export const checkNickname = createAsyncThunk(
  'CHECK_NICKNAME',
  async (nickname, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/check_nickname', {
        params: { nickname },
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 로그인
export const login = createAsyncThunk(
  'LOGIN',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', userInfo);
      const {
        data: { token },
      } = response;
      saveToken(token);
      return response;
    } catch (err) {
      // status 500이면, 500의 에러로 처리
      return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 확인
export const checkPassword = createAsyncThunk(
  'CHECK_PASSWORD',
  async (password, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/user/check_password', password);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 닉네임 변경
export const modifyNickname = createAsyncThunk(
  'MODIFY_NICKNAME',
  async ({ newNickname }, { rejectWithValue }) => {
    const data = {
      changeNickname: newNickname,
    };
    try {
      const response = await axios.put('/api/user/nickname', data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 변경
export const modifyPassword = createAsyncThunk(
  'MODIFY_PASSWORD',
  async ({ newPassword }, { rejectWithValue }) => {
    const data = {
      changePassword: newPassword,
    };
    try {
      const response = await axios.put('/api/user/password', data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const initialState = {
  user: {},
  isNicknameChecked: false,
};

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNicknameCheckedFalse: (state) => {
      state.isNicknameChecked = false;
    },
    // loadUser: {
    //   reducer: (state, action) => {
    //     state.isAuthenticated = action.payload;
    //   },
    //   prepare: () => {
    //     const token = !!getToken();
    //     return { payload: token };
    //   },
  },
  extraReducers: {
    [login.fulfilled]: (state) => {
      state.isAuthenticated = true;
      console.log('reducer 로그인 성공');
    },
    [login.rejected]: (state, action) => {
      state.isAuthenticated = false;
      console.log('reducer 로그인 실패', action.payload.status);
    },
    [checkNickname.fulfilled]: (state) => {
      state.isNicknameChecked = true;
    },
    [checkNickname.rejected]: (state) => {
      state.isNicknameChecked = false;
    },
    [modifyNickname.fulfilled]: (state) => {
      state.isNicknameChecked = false;
    },
  },
});

export const { setNicknameCheckedFalse, loadUser } = authSlice.actions;
export default authSlice.reducer;
