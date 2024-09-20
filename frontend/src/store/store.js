import { configureStore } from '@reduxjs/toolkit';
import authSlice, { login as loginAction } from './userAuth.js';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
if (accessToken && refreshToken) {
  const userData = { 
      //write code
   };
  store.dispatch(loginAction({
    user: userData,
    accessToken,
    refreshToken,
  }));
}

export default store;
