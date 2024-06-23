import authSlice from "./userAuth.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store