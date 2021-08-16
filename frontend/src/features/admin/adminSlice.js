import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    currentMode: 0,
  },
  reducers: {
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
  },
});

export const { setCurrentMode } = adminSlice.actions;
export default adminSlice.reducer;
