import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

export const loadRank = createAsyncThunk(
  'LOAD_RANK',
  async (gameType, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/ranking/game/${gameType}`, {
        params: { limit: 30 },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const rankSlice = createSlice({
  name: 'rank',
  initialState: {
    rankInfo: {},
    currentRankInfo: [],
  },
  reducers: {},
  extraReducers: {
    [loadRank.fulfilled]: (state, action) => {
      const rankInfo = action.payload;
      state.rankInfo = rankInfo;
      // 선택된 운동 정보 담아줄 임시 배열
      const tempRank = [];
      // 각 운동에 대한 정보를 담아준다.
      Object.entries(rankInfo).forEach((item) => {
        const value = item[1];
        const { ranking, nickname, img, count, changeStatus, changeRanking } =
          value;
        tempRank.push([
          ranking,
          nickname,
          img,
          count,
          changeStatus,
          changeRanking,
        ]);
      });
      // currentRankInfo를 업데이트한다.
      state.currentRankInfo = tempRank;
    },
  },
});

export default rankSlice.reducer;
