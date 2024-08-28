import { configureStore } from '@reduxjs/toolkit';
import authSlice, { login as loginAction } from './userAuth.js';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// Initialize state from localStorage
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
if (accessToken && refreshToken) {
  // You might want to verify the tokens or get user data with the tokens
  const userData = { /* user data from token or another source */ };
  store.dispatch(loginAction({
    user: userData,
    accessToken,
    refreshToken,
  }));
}

export default store;
