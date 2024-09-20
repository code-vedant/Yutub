import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/tweets";

const TweetService = {
    createTweet: async (accessToken,data) => {
        try {
            const response = await axios.post(`${API_URL}/`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("Tweet created successfully", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating tweet:", error);
            throw error;
        }
    },
    getTweets: async (accessToken,userId) => {
        try {
            console.log(userId);
            
            const response = await axios.get(`${API_URL}/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("Tweets fetched successfully", response.data);
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
            console.log("Tweet deleted successfully", response.data);
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
            console.log("Tweet updated successfully", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating tweet:", error);
            throw error;
        }
    }
    
}

export default TweetService;