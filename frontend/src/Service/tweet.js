import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/tweets';

const TweetService = {
    createTweet: async (accessToken,data) => {
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
    getTweets: async (accessToken,userId) => {
        try {
            
            const response = await axios.get(`${API_URL}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
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
    updateTweet: async (accessToken, tweetId,data) => {
        try {
            const response = await axios.patch(`${API_URL}/${tweetId}`,data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating tweet:", error);
            throw error;
        }
    }
    
}

export default TweetService;