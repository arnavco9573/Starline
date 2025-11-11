import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice'; // Import the reducer from your slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// These types are important for using TypeScript with Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;