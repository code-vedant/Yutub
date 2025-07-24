import axios from "axios";

const API_URL =
  (import.meta.env.VITE_NODE_ENV !== "development"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/api/v1") + "/likes";

const LikeService = {
  // ---------- Toggle Likes ----------
  toggleVideoLike: async ({ accessToken }, videoId) => {
    return await LikeService._toggleLike(`/toggle/v/${videoId}`, accessToken);
  },

  toggleCommentLike: async ({ accessToken }, commentId) => {
    return await LikeService._toggleLike(`/toggle/c/${commentId}`, accessToken);
  },

  toggleTweetLike: async ({ accessToken }, tweetId) => {
    return await LikeService._toggleLike(`/toggle/t/${tweetId}`, accessToken);
  },

  togglePhotoLike: async ({ accessToken }, photoId) => {
    return await LikeService._toggleLike(`/toggle/p/${photoId}`, accessToken);
  },

  _toggleLike: async (path, accessToken) => {
    try {
      const response = await axios.patch(`${API_URL}${path}`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error toggling like on ${path}:`, error);
      throw error;
    }
  },

  // ---------- Get Likes ----------
  getVideoLikes: async (videoId) => {
    return await LikeService._getLikes(`/video/${videoId}`);
  },

  getTweetLikes: async (tweetId) => {
    return await LikeService._getLikes(`/tweet/${tweetId}`);
  },

  getCommentLikes: async (commentId) => {
    return await LikeService._getLikes(`/comment/${commentId}`);
  },

  getPhotoLikes: async (photoId) => {
    return await LikeService._getLikes(`/photo/${photoId}`);
  },

  _getLikes: async (path) => {
    try {
      const response = await axios.get(`${API_URL}${path}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching likes from ${path}:`, error);
      throw error;
    }
  },

  // ---------- Check if Liked ----------
  checkVideoLiked: async ({accessToken}, videoId) => {
    return await LikeService._checkLiked(`/check/v/${videoId}`, accessToken);
  },

  checkTweetLiked: async ({accessToken}, tweetId) => {
    return await LikeService._checkLiked(`/check/t/${tweetId}`, accessToken);
  },

  checkPhotoLiked: async ({accessToken}, photoId) => {
    return await LikeService._checkLiked(`/check/p/${photoId}`, accessToken);
  },

  checkCommentLiked: async ({accessToken}, commentId) => {
    return await LikeService._checkLiked(`/check/c/${commentId}`, accessToken);
  },

  _checkLiked: async (path, accessToken) => {
    try {
      const response = await axios.get(`${API_URL}${path}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error checking like on ${path}:`, error);
      throw error;
    }
  },

  // ---------- Get All Liked Content ----------
  getLikedVideos: async (accessToken) => {
    return await LikeService._getLikedList("/videos", accessToken);
  },

  getLikedTweets: async (accessToken) => {
    return await LikeService._getLikedList("/tweets", accessToken);
  },

  getLikedComments: async (accessToken) => {
    return await LikeService._getLikedList("/comments", accessToken);
  },

  getLikedPhotos: async (accessToken) => {
    return await LikeService._getLikedList("/photos", accessToken);
  },

  _getLikedList: async (path, accessToken) => {
    try {
      const response = await axios.get(`${API_URL}${path}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching liked content from ${path}:`, error);
      throw error;
    }
  },
};

export default LikeService;