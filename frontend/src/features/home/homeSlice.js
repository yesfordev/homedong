import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

// input - password, gameType
export const makeRoom = createAsyncThunk(
  'MAKE_ROOM',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/rooms', data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
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
      return rejectWithValue(err.response);
    }
  }
);

export const searchRoom = createAsyncThunk(
  'SEARCH_ROOM',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/rooms/search', data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const homeSlice = createSlice({
  name: 'test',
  initialState: {
    roomId: '',
    gameType: '',
    nickname: '',
  },
  reducers: {},
  extraReducers: {
    [makeRoom.fulfilled]: (state, action) => {
      const { roomId, gameType, nickname } = action.payload;
      state.roomId = roomId;
      state.gameType = gameType;
      state.nickname = nickname;
    },
    [searchRoom.fulfilled]: (state, action) => {
      const { roomId, gameType, nickname } = action.payload;
      state.roomId = roomId;
      state.gameType = gameType;
      state.nickname = nickname;
    },
    [leaveRoom.fulfilled]: (state) => {
      state.roomId = '';
      state.gameType = '';
      state.nickname = '';
    },
    [quickStart.fulfilled]: (state, action) => {
      const { roomId, gameType, nickname } = action.payload;
      state.roomId = roomId;
      state.gameType = gameType;
      state.nickname = nickname;
    },
  },
});

export default homeSlice.reducer;
