import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = {
  uid: string;
  email?: string;
  displayName?: string;
  role: string;
};

export interface AuthState {
  user: UserType | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
