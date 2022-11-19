import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { appSlice } from './slices/app';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    app: appSlice.reducer
  },
});
