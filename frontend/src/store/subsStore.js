import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscribedChannels: [],
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscribedChannels: (state, action) => {
      state.subscribedChannels = action.payload;
    },
    addSubscribedChannel: (state, action) => {
      state.subscribedChannels.push(action.payload);
    },
    removeSubscribedChannel: (state, action) => {
      state.subscribedChannels = state.subscribedChannels.filter(
        (channelId) => channelId !== action.payload
      );
    },
  },
});

export const {
  setSubscribedChannels,
  addSubscribedChannel,
  removeSubscribedChannel,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
