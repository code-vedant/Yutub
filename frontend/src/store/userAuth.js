import { createSlice } from "@reduxjs/toolkit";

// Initial state without localStorage
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
    
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
