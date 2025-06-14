import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  userData: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken } = action.payload;
      state.status = true;
      state.userData = user;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.accessToken = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
