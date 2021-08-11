import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

export const loadRank = createAsyncThunk(
  'LOAD_RANK',
  async (gameType, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/ranking/game/${gameType}`, {
        params: { limit: 30 },
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const rankSlice = createSlice({
  name: 'rank',
  initialState: {
    rankInfo: {},
  },
  reducers: {},
  extraReducers: {
    [loadRank.fulfilled]: (state, action) => {
      state.rankInfo = action.payload;
    },
  },
});

export default rankSlice.reducer;
