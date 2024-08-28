import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.userData;

export default authSlice.reducer;
