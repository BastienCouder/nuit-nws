import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import rankingReducer from '@/features/rank/rankSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ranking: rankingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;