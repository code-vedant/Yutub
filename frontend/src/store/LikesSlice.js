import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedVideos: [],
  likedTweets: [],
  likedComments: [],
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLikedVideo: (state, action) => {
      state.likedVideos.push(action.payload);
    },
    addLikedTweet: (state, action) => {
      state.likedTweets.push(action.payload);
    },
    addLikedComment: (state, action) => {
      state.likedComments.push(action.payload);
    },
    removeLikedVideo: (state, action) => {
      state.likedVideos = state.likedVideos.filter(
        (videoId) => videoId !== action.payload
      );
    },
    removeLikedTweet: (state, action) => {
      state.likedTweets = state.likedTweets.filter(
        (tweetId) => tweetId !== action.payload
      );
    },
    removeLikedComment: (state, action) => {
      state.likedComments = state.likedComments.filter(
        (commentId) => commentId !== action.payload
      );
    },
  },
});

export const {
  addLikedVideo,
  addLikedTweet,
  addLikedComment,
  removeLikedVideo,
  removeLikedTweet,
  removeLikedComment,
} = likeSlice.actions;

export default likeSlice.reducer;
