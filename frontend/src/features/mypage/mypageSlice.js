import { createSlice } from '@reduxjs/toolkit';

const mypageSlice = createSlice({
  name: 'mypage',
  initialState: {
    userInfo: {
      recordInfo: {
        situp: 20,
        pushup: 15,
        squat: 13,
      },
      badgeInfo: ['badge1', 'badge2', 'badge3'],
      dailyInfo: ['0101', '0102', '0102'],
    },
  },
  reducers: {},
  extraReducers: {},
});

export default mypageSlice.reducer;
