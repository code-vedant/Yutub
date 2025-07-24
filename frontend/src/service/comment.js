import axios from "axios";

const BASE_URL =
  (import.meta.env.VITE_NODE_ENV !== "development"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/api/v1") + "/comments";

const CommentService = {
  // ------- VIDEO COMMENTS -------
  getVideoComments: async (videoId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${videoId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting video comments", error);
      throw error;
    }
  },

  addVideoComment: async ({ accessToken }, videoId, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/${videoId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding video comment", error);
      throw error;
    }
  },

  // ------- TWEET COMMENTS -------
  getTweetComments: async (tweetId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${tweetId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting tweet comments", error);
      throw error;
    }
  },

  addTweetComment: async ({ accessToken }, tweetId, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/${tweetId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding tweet comment", error);
      throw error;
    }
  },

  // ------- PHOTO COMMENTS -------
  getPhotoComments: async (photoId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${photoId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting photo comments", error);
      throw error;
    }
  },

  addPhotoComment: async ({ accessToken }, photoId, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/${photoId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding photo comment", error);
      throw error;
    }
  },

  // ------- COMMON TO ALL -------
  updateComment: async ({ accessToken }, commentId, data) => {
    try {
      const response = await axios.patch(`${BASE_URL}/c/${commentId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating comment", error);
      throw error;
    }
  },

  deleteComment: async ({ accessToken }, commentId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/c/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting comment", error);
      throw error;
    }
  },
};

export default CommentService;
