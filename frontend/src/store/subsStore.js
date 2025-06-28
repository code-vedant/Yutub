import { createSlice } from '@reduxjs/toolkit';
import { logout } from './userAuth.js';

const initialState = {
  subscribedChannels: [],
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // Existing reducers...
    addSubscribedChannel: (state, action) => {
      state.subscribedChannels.push(action.payload);
    },
    removeSubscribedChannel: (state, action) => {
      state.subscribedChannels = state.subscribedChannels.filter(
        (channelId) => channelId !== action.payload
      );
    },
    
    // New bulk set action for login
    setSubscribedChannels: (state, action) => {
      state.subscribedChannels = action.payload;
    },
    
    resetSubscriptions: (state) => {
      state.subscribedChannels = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.subscribedChannels = [];
    });
  },
});

export const { 
  addSubscribedChannel, 
  removeSubscribedChannel, 
  setSubscribedChannels,
  resetSubscriptions 
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;