import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

// input - password, gameType
export const makeRoom = createAsyncThunk(
  'MAKE_ROOM',
  async ([gameType, password], { rejectWithValue }) => {
    try {
      const userInfo = {
        gameType,
        password,
      };
      const response = await axios.post('/api/rooms', userInfo);
      return response.data;
    } catch (err) {
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
  async (gameType, { rejectWithValue }) => {
    try {
      const userInfo = { gameType };
      const response = await axios.post('/api/rooms/quick', userInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const findRoom = createAsyncThunk(
  'FIND_ROOM',
  async ([password, roomId], { rejectWithValue }) => {
    try {
      console.log('findRoom', password, roomId);
      const userInfo = {
        password,
        roomId,
      };
      console.log('search action', userInfo);
      const response = await axios.post('api/rooms/search', userInfo);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const testSlice = createSlice({
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

export default testSlice.reducer;
