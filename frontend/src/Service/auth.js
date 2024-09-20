import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/users";


// const token = useSelector((state) => state.auth.accessToken);



const AuthService = {
  login: async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },
  signup: async (data) => {
    const response = await axios.post(`${API_URL}/register`, data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  },
  logout: async (accessToken) => {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  },
  getUserData: async (accessToken) => {
    try {
      const response = await axios.get(`${API_URL}/current-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data; 
      
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
  updateProfile: async (accessToken,data) => {
    console.log(data);
    
    try {
      const response = await axios.patch(
        `${API_URL}/update-account`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
  updateAvatar: async (accessToken,data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/avatar`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Avatar Updated");

      return response.data;
    } catch (error) {
      console.error("Error updating user avatar:", error.message);
      throw error;
    }
  },
  updateCoverImage: async (accessToken,data) => {
    try {
      const response = await axios.patch(
        `${API_URL}/cover-image`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Cover Updated");
      
      return response.data;
    } catch (error) {
      console.error("Error updating user cover image:", error);
      throw error;
    }
  },
  getUserById: async (accessToken,data) => {
    try {
      const response = await axios.get(
        `${API_URL}/${data}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },
  changeCurrentPassword: async (accessToken,data) => {
    try {
      const response = await axios.post(
        `${API_URL}/change-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error changing current password:", error);
      throw error;
    }
  }
};

export default AuthService;
