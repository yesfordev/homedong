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

export const loadDailyRecord = createAsyncThunk(
  'LOAD_DAILY_RECORD',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get('api/calendar/daily', {
        params: { month, year },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loadConsecutiveRecord = createAsyncThunk(
  'LOAD_CONSECUTIVE_RECORD',
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/calendar/day-count');
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const changeUserProfile = createAsyncThunk(
  'CHANGE_USER_PROFILE',
  async (imgNum, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/user/image?imgNum=${imgNum}`);
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
    dailyRecordInfo: {},
    badgesOwned: [],
    consecutiveRecordInfo: {},
  },
  reducers: {
    resetMyPageInfo: (state) => {
      state.badgeInfo = {};
      state.bestRecordInfo = {};
      state.dailyInfo = {};
      state.badgesOwned = [];
    },
    loadBadgesOwned: (state) => {
      const gameTypes = ['squat', 'pushUp', 'burpee'];
      let gameType = '';
      const { badgeInfo } = state;
      Object.entries(badgeInfo).forEach(([exercise, detailInfo]) => {
        // 홈동킹
        if (detailInfo === true) {
          state.badgesOwned.push([exercise, 'best']);
        }
        // 각 운동 뱃지 탐색
        Array.from(detailInfo).forEach((detailObject) => {
          Object.entries(detailObject).forEach(([key, value]) => {
            if (key === 'gameType') {
              gameType = gameTypes[value - 1];
            }
            if (value === true) {
              state.badgesOwned.push([gameType, key]);
            }
          });
        });
      });
    },
    saveNewBadges: (state, action) => {
      state.badgeInfo = action.payload;
    },
  },
  extraReducers: {
    [loadBadge.fulfilled]: (state, action) => {
      state.badgeInfo = action.payload;
      state.badgesOwned = [];
    },
    [loadBestRecord.fulfilled]: (state, action) => {
      state.bestRecordInfo = action.payload;
    },
    [loadDailyRecord.fulfilled]: (state, action) => {
      const rawData = action.payload;
      state.dailyRecordInfo = rawData.map((record) => {
        const { date } = record;
        return date.split('-');
      });
    },
    [loadConsecutiveRecord.fulfilled]: (state, action) => {
      state.consecutiveRecordInfo = action.payload;
    },
  },
});

export const { resetMyPageInfo, loadBadgesOwned, saveNewBadges } =
  mypageSlice.actions;
export default mypageSlice.reducer;
