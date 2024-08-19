import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
// Import your reducers here

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // Add more reducers here as you create them
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
