import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../common/api/http-common';

export const login = createAsyncThunk('LOGIN', async (userInfo) => {
  await axios
    .post('/login', userInfo)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {},
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [login.pending]: () => {
      console.log('pending');
    },
  },
});

export default loginSlice.reducer;
