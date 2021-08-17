import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isPrivate: false,
  },
  reducers: {
    setPrivate: (state) => {
      state.isPrivate = true;
    },
    setPublic: (state) => {
      state.isPrivate = false;
    },
  },
  extraReducers: {},
});

export const { setPrivate, setPublic } = commonSlice.actions;
export default commonSlice.reducer;
