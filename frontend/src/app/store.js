// reducer를 모아주는 함수,store를만들어주는 함수
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from '../features/auth/authSlice';
import MyPageReducer from '../features/mypage/mypageSlice';
import RankReducer from '../features/rank/rankSlice';
import HomeReducer from '../features/home/homeSlice';
import CommonReducer from '../common/commonSlice';
import AdminReducer from '../features/admin/adminSlice';

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['isAdmin'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAdmin'],
};

const rootReducer = combineReducers({
  // 각 리듀서를 합침
  auth: persistReducer(authPersistConfig, AuthReducer),
  mypage: MyPageReducer,
  rank: RankReducer,
  home: HomeReducer,
  common: CommonReducer,
  admin: AdminReducer,
});
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // 합친 리듀서 연결
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default function configStore() {
  const persistor = persistStore(store);
  return { store, persistor };
}
