import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
  avatar_url?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth', // The name of this slice
  initialState,
  reducers: {
    // This is the 'login' action your component is dispatching
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token;
      // Note: localStorage.setItem is already handled in your component, which is fine
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Good to have a logout action too
    },
  },
});

// Export the actions so your components can call them
export const { login, logout } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;