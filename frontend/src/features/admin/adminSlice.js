import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

export const getUsersData = createAsyncThunk(
  'GET_USER_DATA',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/admin');
      console.log(response, 'res');
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    currentMode: 0,
    usersData: {},
  },
  reducers: {
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
  },
  extraReducers: {
    [getUsersData.fulfilled]: (state, action) => {
      state.usersData = action.payload;
    },
  },
});

export const { setCurrentMode } = adminSlice.actions;
export default adminSlice.reducer;
