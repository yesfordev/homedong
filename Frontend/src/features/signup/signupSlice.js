import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// signup axios -> REST API, params 필요
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

// email confirm axios -> REST API, params 필요
export const checkEmail = createAsyncThunk('CHECK_EMAIL', async (emailInfo) => {
  console.log('이메일 버튼 활성화', emailInfo);
  await axios
    .get('/checkemail', emailInfo)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

// nickname confirm axios -> REST API, params 필요
export const checkNickname = createAsyncThunk(
  'CHECK_NICKNAME',
  async (nickname) => {
    console.log('닉네임 버튼 활성화', nickname);
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

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    user: {},
  },
  reducers: {},
  // 조사 필요, return 값 찾아야함
  // fullfilled -> 완료되었을 때 무슨 일을 할지? (signup은 로그인 시켜준다, 이런것?)
  extraReducers: {
    [signup.fulfilled]: (state) => [...state],
    [checkEmail.fulfilled]: () => [],
    [checkNickname.fullfilled]: () => [],
  },
});

// export const { signup } = signUpSlice.actions;
export default signUpSlice.reducer;
