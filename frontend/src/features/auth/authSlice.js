import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

// 메서드 전체 REST API, params 필요
// 회원가입
export const signup = createAsyncThunk(
  'SIGNUP',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signup', userInfo);
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
      return response.data;
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
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

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
  },
  // 조사 필요, return 값 찾아야함
  // fullfilled -> 완료되었을 때 무슨 일을 할지? (signup은 로그인 시켜준다, 이런것?)
  extraReducers: {
    [signup.fulfilled]: (state) => {
      console.log('reducer', state);
    },
    [signup.rejected]: (state) => {
      console.log('reducer 회원가입 실패');
      state.user = {};
    },
    [login.fullfilled]: (state) => {
      state.user = login.value;
    },
    [logout.fullfilled]: (state) => {
      console.log('로그아웃', state);
    },
    [checkNickname.fulfilled]: (state) => {
      state.isNicknameChecked = true;
    },
    [checkNickname.rejected]: (state) => {
      state.isNicknameChecked = false;
    },
  },
});

export const { setNicknameCheckedFalse } = authSlice.actions;
// export const userSelector = (state) => state.user;
export default authSlice.reducer;
