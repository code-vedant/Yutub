import { createSlice } from '@reduxjs/toolkit';
import { logout } from './userAuth.js';

const initialState = {
  likedVideos: [],
  likedTweets: [],
  likedComments: [],
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    // Existing reducers...
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
    
    // New bulk set actions for login
    setLikedVideos: (state, action) => {
      state.likedVideos = action.payload;
    },
    setLikedTweets: (state, action) => {
      state.likedTweets = action.payload;
    },
    setLikedComments: (state, action) => {
      state.likedComments = action.payload;
    },
    
    resetLikes: (state) => {
      state.likedVideos = [];
      state.likedTweets = [];
      state.likedComments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.likedVideos = [];
      state.likedTweets = [];
      state.likedComments = [];
    });
  },
});

export const {
  addLikedVideo,
  addLikedTweet,
  addLikedComment,
  removeLikedVideo,
  removeLikedTweet,
  removeLikedComment,
  setLikedVideos,
  setLikedTweets,
  setLikedComments,
  resetLikes,
} = likeSlice.actions;

export default likeSlice.reducer;