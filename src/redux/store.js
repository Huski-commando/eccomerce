import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/themeSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    themeState: themeReducer,
    auth: authReducer,
  },
});
