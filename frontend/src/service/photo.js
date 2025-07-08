import axios from "axios";

const API_URL = (import.meta.env.VITE_NODE_ENV !== "development" ? import.meta.env.VITE_API_URL  : "http://localhost:8000/api/v1") + '/photos'


const PhotoService = {
  getAllPhotos: async (filters) => {
    try {
      const response = await axios.get(`${API_URL}/`,{
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  },

  getPhotoById: async (accessToken, videoId) => {
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

  uploadPhoto: async (accessToken, data) => {
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

  updatePhoto: async (accessToken, videoId, data) => {
    try {
      const response = await axios.put(`${API_URL}/${videoId}`, data, {
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
  deletePhoto: async (accessToken, videoId) => {
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
  getMyPhoto: async (accessToken) => {
    try {
      const response = await axios.get(
        `${API_URL}/my-photos`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error getting own photos`,
        error.response.data
      );
      throw error;
    }
  },
};

export default PhotoService;
