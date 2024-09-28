import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/comments';

const CommentService = {
  getAllComments: async (accessToken,videoId) => {
    try {
      const response = await axios.get(`${API_URL}/${videoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  addComments: async ( accessToken,videoId, data) => {
    try {
      const response = await axios.post(`${API_URL}/${videoId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateComment: async (accessToken, commentId,data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/c/${commentId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteComment: async (accessToken, commentId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/c/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default CommentService;