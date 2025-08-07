import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/slice';
import problemReducer from '@/store/problems/slice';
import projectReducer from '@/store/project/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problems: problemReducer,
    projects: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
