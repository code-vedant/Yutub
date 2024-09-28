import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/videos';

const VideoService = {
  getAllVideos: async (accessToken) => {
    try {
      const response = await axios.get(`${API_URL}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  },

  getVideoById: async (accessToken, videoId) => {
    try {
      const response = await axios.get(`${API_URL}/${videoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching video with ID ${videoId}:`, error);
      throw error;
    }
  },

  uploadVideo: async (accessToken, data) => {
    try {
      const response = await axios.post(`${API_URL}/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading video:", error.message);
      throw error;
    }
  },

  updateVideo: async (accessToken, videoId, data) => {
    try {
      const response = await axios.patch(`${API_URL}/${videoId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating video with ID ${videoId}:`, error);
      throw error;
    }
  },
  deleteVideo: async (accessToken, videoId) => {
    try {
      const response = await axios.delete(`${API_URL}/${videoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting video with ID ${videoId}:`, error);
      throw error;
    }
  },
  togglePublishStatus: async (accessToken, videoId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/toggle/publish/${videoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error toggling publish status for video with ID ${videoId}:`,
        error.message
      );
      throw error;
    }
  },
};

export default VideoService;
