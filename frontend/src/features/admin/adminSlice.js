import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../common/api/http-common';

export const getUsersData = createAsyncThunk(
  'GET_USERS_DATA',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/admin');
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const letUserDeleted = createAsyncThunk(
  'LET_USER_DELETED',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/admin/${email}`);
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
      state.usersData = action.payload.data;
    },
  },
});

export const { setCurrentMode } = adminSlice.actions;
export default adminSlice.reducer;
