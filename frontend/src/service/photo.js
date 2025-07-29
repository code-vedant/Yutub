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

  getPhotoById: async (photoId) => {
    try {
      const response = await axios.get(`${API_URL}/${photoId}`);
      //console.log(response);
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching photo with ID ${photoId}:`, error);
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

  updatePhoto: async (accessToken, photoId, data) => {
    try {
      const response = await axios.put(`${API_URL}/${photoId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating video with ID ${photoId}:`, error);
      throw error;
    }
  },
  deletePhoto: async (accessToken, photoId) => {
    try {
      const response = await axios.delete(`${API_URL}/${photoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting video with ID ${photoId}:`, error);
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
  getUserPhotos: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching photos for user with ID ${userId}:`, error);
      throw error;
    }
  },
};

export default PhotoService;
