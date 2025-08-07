import type { AuthUser, User } from '@/types/User';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthUser = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPendingUser: (
      _state,
      action: PayloadAction<User>
    ) => {
      return {
        user: action.payload,
        isAuthenticated: false,
      };
    },
    // Set user directly as authenticated (used for token verification)
    setUser: (_state, action: PayloadAction<User>) => {
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    },
    // Mark authentication successful after code verification
    verifySuccess: state => {
      return {
        user: state.user,
        isAuthenticated: true,
      };
    },
    // Clear all user data and authentication state
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setPendingUser, setUser, verifySuccess, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
