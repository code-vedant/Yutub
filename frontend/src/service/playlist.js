import axios from "axios";

const API_URL = (import.meta.env.VITE_NODE_ENV !== "development" ? import.meta.env.VITE_API_URL  : "http://localhost:8000/api/v1") + '/playlist';

const PlaylistService = {
  getUserPlaylists: async ({accessToken}, userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getPlaylistById: async (playlistId) => {

    console.log(`Fetching playlist with ID: ${playlistId}`);
    
    try {
      const response = await axios.get(`${API_URL}/${playlistId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  createPlaylist: async (playlistData,{accessToken}) => {
    try {
      const response = await axios.post(`${API_URL}/`, playlistData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error creating playlist: " + error.response?.data.message);
    }
  },
  addVideo: async (accessToken, videoId, playlistId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/add/${videoId}/${playlistId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  removeVideo: async (accessToken, videoId, playlistId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/remove/${videoId}/${playlistId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  updatePlaylist: async ({accessToken}, playlistId, playlistData) => {
    console.log(`Updating playlist with ID: ${playlistId}`, playlistData);
    
    try {
      const response = await axios.patch(
        `${API_URL}/${playlistId}`,
        playlistData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  deletePLaylist: async ({accessToken}, playlistId) => {
    try {
      const response = await axios.delete(`${API_URL}/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default PlaylistService;
