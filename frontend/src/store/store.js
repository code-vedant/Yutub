import { configureStore } from '@reduxjs/toolkit';
import authSlice, { login as loginAction } from './userAuth.js';
import subscriptionSlice from './subsStore.js'
import LikesSlice from './LikesSlice.js';

const store = configureStore({
  reducer: {
    auth: authSlice,
    subscription: subscriptionSlice,
    like: LikesSlice,
  },
});

const accessToken = sessionStorage.getItem('accessToken');
const refreshToken = sessionStorage.getItem('refreshToken');
const storedUserData = sessionStorage.getItem('userData');

if (accessToken && refreshToken && storedUserData) {
  try {
    const userData = JSON.parse(storedUserData); 
    store.dispatch(loginAction({
      user: userData,
      accessToken,
      refreshToken,
    }));
  } catch (error) {
    console.error('Failed to parse stored user data:', error);
    sessionStorage.clear();
  }
}

export default store;
