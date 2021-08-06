import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

export const loadBadge = createAsyncThunk(
  'LOAD_BADGE',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/record/badge');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadBestRecord = createAsyncThunk(
  'LOAD_BEST_RECORD',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/record/best');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const mypageSlice = createSlice({
  name: 'mypage',
  initialState: {
    badgeInfo: {},
    bestRecordInfo: {},
    dailyInfo: {},
  },
  reducers: {
    resetMyPageInfo: (state) => {
      state.badgeInfo = {};
      state.bestRecordInfo = {};
      state.dailyInfo = {};
    },
  },
  extraReducers: {
    [loadBadge.fulfilled]: (state, action) => {
      state.badgeInfo = action.payload;
    },
    [loadBestRecord.fulfilled]: (state, action) => {
      state.bestRecordInfo = action.payload;
    },
  },
});

export const { resetMyPageInfo } = mypageSlice.actions;
export default mypageSlice.reducer;
