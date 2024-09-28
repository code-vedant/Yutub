import { createSlice } from '@reduxjs/toolkit';

const subscribedChannelsFromStorage = sessionStorage.getItem('subscribedChannels')
  ? JSON.parse(sessionStorage.getItem('subscribedChannels'))
  : [];

const initialState = {
  subscribedChannels: subscribedChannelsFromStorage,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    addSubscribedChannel: (state, action) => {
      state.subscribedChannels.push(action.payload);
      sessionStorage.setItem('subscribedChannels', JSON.stringify(state.subscribedChannels));
    },
    removeSubscribedChannel: (state, action) => {
      state.subscribedChannels = state.subscribedChannels.filter(
        (channelId) => channelId !== action.payload
      );
      sessionStorage.setItem('subscribedChannels', JSON.stringify(state.subscribedChannels));
    },
  },
});

export const { addSubscribedChannel, removeSubscribedChannel } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
