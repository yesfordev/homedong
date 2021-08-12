import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

// input - password, gameType
export const makeRoom = createAsyncThunk(
  'MAKE_ROOM',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/rooms', data);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const leaveRoom = createAsyncThunk(
  'LEAVE_ROOM',
  async ([roomId, gameToken], { rejectWithValue }) => {
    try {
      const userInfo = {
        roomId,
        token: gameToken,
      };
      const response = await axios.put('/api/rooms', userInfo);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const quickStart = createAsyncThunk(
  'QUICK_START',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/rooms/quick', data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const findRoom = createAsyncThunk(
  'FIND_ROOM',
  async (data, { rejectWithValue }) => {
    try {
      console.log('search action', data);
      const response = await axios.post('api/rooms/search', data);
      return response;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const homeSlice = createSlice({
  name: 'test',
  initialState: {
    token: '',
    roomId: '',
    gameType: '',
    nickname: '',
  },
  reducers: {},
  extraReducers: {
    [makeRoom.fulfilled]: (state, action) => {
      const { token, roomId, gameType, nickname } = action.payload;
      state.token = token;
      state.roomId = roomId;
      state.gameType = gameType;
      state.nickname = nickname;
    },
    [leaveRoom.fulfilled]: (state) => {
      state.token = '';
      state.roomId = '';
      state.gameType = '';
      state.nickname = '';
    },
    [quickStart.fulfilled]: (state, action) => {
      const { token, roomId, gameType, nickname } = action.payload;
      state.token = token;
      state.roomId = roomId;
      state.gameType = gameType;
      state.nickname = nickname;
    },
  },
});

export default homeSlice.reducer;
