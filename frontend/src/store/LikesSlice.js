import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedVideos: JSON.parse(sessionStorage.getItem('likedVideos')) || [],
  likedTweets: JSON.parse(sessionStorage.getItem('likedTweets')) || [],
  likedComments: JSON.parse(sessionStorage.getItem('likedComments')) || [],
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLikedVideo: (state, action) => {
      state.likedVideos.push(action.payload);
      sessionStorage.setItem('likedVideos', JSON.stringify(state.likedVideos));
    },
    addLikedTweet: (state, action) => {
      state.likedTweets.push(action.payload);
      sessionStorage.setItem('likedTweets', JSON.stringify(state.likedTweets));
    },
    addLikedComment: (state, action) => {
      state.likedComments.push(action.payload);
      sessionStorage.setItem('likedComments', JSON.stringify(state.likedComments));
    },
    removeLikedVideo: (state, action) => {
      state.likedVideos = state.likedVideos.filter(
        (videoId) => videoId !== action.payload
      );
      sessionStorage.setItem('likedVideos', JSON.stringify(state.likedVideos));
    },
    removeLikedTweet: (state, action) => {
      state.likedTweets = state.likedTweets.filter(
        (tweetId) => tweetId !== action.payload
      );
      sessionStorage.setItem('likedTweets', JSON.stringify(state.likedTweets));
    },
    removeLikedComment: (state, action) => {
      state.likedComments = state.likedComments.filter(
        (commentId) => commentId !== action.payload
      );
      sessionStorage.setItem('likedComments', JSON.stringify(state.likedComments));
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
