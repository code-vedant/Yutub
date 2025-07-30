import axios from "axios";

const API_URL =
  (import.meta.env.VITE_NODE_ENV !== "development"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000/api/v1") + "/tweets";

const TweetService = {
  getAllTweets: async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data
    } catch (error) {
      console.error("Error fetching all tweets:", error.response.data.message);
      throw error;
    }
  },
  getTweetById: async (tweetId) => {
    try {
        const response = await axios.get(`${API_URL}/${tweetId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching tweet by ID:", error.response.data.message);
        throw error;
      }
  },
  createTweet: async (accessToken, data) => {
    try {
      const response = await axios.post(`${API_URL}/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating tweet:", error);
      throw error;
    }
  },
  getTweets: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tweets:", error.message);
      throw error;
    }
  },
  deleteTweet: async (accessToken, tweetId) => {
    try {
      const response = await axios.delete(`${API_URL}/${tweetId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting tweet:", error);
      throw error;
    }
  },
  updateTweet: async (accessToken, tweetId, data) => {
    try {
      const response = await axios.patch(`${API_URL}/${tweetId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating tweet:", error);
      throw error;
    }
  },
};

export default TweetService;
