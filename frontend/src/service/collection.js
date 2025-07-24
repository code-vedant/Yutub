import axios from "axios";

const API_URL = (import.meta.env.VITE_NODE_ENV !== "development" ? import.meta.env.VITE_API_URL  : "http://localhost:8000/api/v1") + '/collection';

const CollectionService = {
  getUserCollections: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getCollectionById: async (collectionId) => {

    //console.log(`Fetching collection with ID: ${collectionId}`);
    
    try {
      const response = await axios.get(`${API_URL}/${collectionId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  createCollection: async (collectionData,{accessToken}) => {
    try {
      const response = await axios.post(`${API_URL}/`, collectionData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error creating collection: " + error.response?.data.message);
    }
  },
  addVideo: async (accessToken, videoId, collectionId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/add/${videoId}/${collectionId}`,
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
  removeVideo: async (accessToken, videoId, collectionId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/remove/${videoId}/${collectionId}`,
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
  updateCollection: async ({accessToken}, collectionId, collectionData) => {
    //console.log(`Updating collection with ID: ${collectionId}`, collectionData);
    
    try {
      const response = await axios.patch(
        `${API_URL}/${collectionId}`,
        collectionData,
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
  deleteCollection: async ({accessToken}, collectionId) => {
    try {
      const response = await axios.delete(`${API_URL}/${collectionId}`, {
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

export default CollectionService;
