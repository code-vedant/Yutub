import { createSlice } from '@reduxjs/toolkit';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const storedUserData = localStorage.getItem('userData');

const initialState = {
  status: accessToken && refreshToken ? true : false,
  userData: storedUserData ? JSON.parse(storedUserData) : null,
  accessToken: accessToken || null,
  refreshToken: refreshToken || null,
};

console.log('Initial auth state:', initialState);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      console.log('Login action payload:', action.payload);

      state.status = true;
      state.userData = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('State after login:', state);
    },
    logout: (state) => {
      console.log('Logout action triggered');

      state.status = false;
      state.userData = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      console.log('State after logout:', state);
    },
    setAccessToken: (state, action) => {
      console.log('SetAccessToken action payload:', action.payload);

      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);

      console.log('State after setAccessToken:', state);
    },
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
