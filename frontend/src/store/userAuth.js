import { createSlice } from '@reduxjs/toolkit';

// Load session data (if available) from sessionStorage
const accessToken = sessionStorage.getItem('accessToken');
const refreshToken = sessionStorage.getItem('refreshToken');
const storedUserData = sessionStorage.getItem('userData');

const initialState = {
  status: accessToken && refreshToken ? true : false,
  userData: storedUserData ? JSON.parse(storedUserData) : null,
  accessToken: accessToken || null,
  refreshToken: refreshToken || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      
      state.status = true;
      state.userData = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      sessionStorage.setItem('userData', JSON.stringify(user));
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    },
    logout: (state) => {
      // Clear Redux state
      state.status = false;
      state.userData = null;
      state.accessToken = null;
      state.refreshToken = null;

      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;

      sessionStorage.setItem('accessToken', action.payload);
    }
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
