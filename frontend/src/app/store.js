// reducer를 모아주는 함수,store를만들어주는 함수
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/auth/authSlice';
import MyPageReducer from '../features/mypage/mypageSlice';

const rootreducer = combineReducers({
  // 각 리듀서를 합침
  auth: AuthReducer,
  mypage: MyPageReducer,
});

const store = configureStore({
  reducer: rootreducer, // 합친 리듀서 연결
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; // 외부 인스톨이 가능하게 해줌
