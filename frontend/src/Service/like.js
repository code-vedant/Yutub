import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/likes";

const LikeService = {
    toggleVideoLike: async (accessToken,videoId) => {
        try {
            const response = await axios.patch(`${API_URL}/toggle/v/${videoId}`,{}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data.message);
            return response.data;
        } catch (error) {
            console.error(`Error liking/unliking video with ID ${videoId}:`, error);
            throw error;
        }
    },
    toggleCommentLike: async (accessToken,commentId) => {
        try {
            const response = await axios.patch(`${API_URL}/toggle/c/${commentId}`,{}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data.messsage);
            return response.data;
        } catch (error) {
            console.error(`Error liking/unliking comment with ID ${commentId}:`, error);
            throw error;
        }
    },
    toggleTweetLike: async (accessToken,tweetId) => {
        try {
            
            const response = await axios.patch(`${API_URL}/toggle/t/${tweetId}`,{}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(`Error liking/unliking tweet with ID ${tweetId}:`, error);
            throw error;
        }
    },
    getLikedVideos: async (accessToken) => {
        try {
            const response = await axios.get(`${API_URL}/videos`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data.message);
            return response.data;
        } catch (error) {
            console.error("Error fetching likes by video:", error);
            throw error;
        }
    },
    getLikedTweet: async (accessToken) => {
        try {
            const response = await axios.get(`${API_URL}/tweets`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating tweet:", error);
            throw error;
        }
    }
}

export default LikeService;