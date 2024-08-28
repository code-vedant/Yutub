import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/users";

const AuthService = {
  async login({ email, password }) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },
  signup: async (data) => {
    const response = await axios.post(`${API_URL}/signup`, data);
    console.log(response.data);
    return response.data;
  },
  logout: async (token) => {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
  getUserData: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return only the data part of the response
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error; // Optionally rethrow the error for further handling
    }
  },
  updateProfile: async (token, data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/update-account`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
  updateAvatar: async (token, data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/avatar`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user avatar:", error);
      throw error;
    }
  },
  updateCoverImage: async (token, data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/coverImage`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user cover image:", error);
      throw error;
    }
  }
};

export default AuthService;
