import axios from "axios";

const API_URL = (import.meta.env.VITE_NODE_ENV !== "development" ? import.meta.env.VITE_API_URL  : "http://localhost:8000/api/v1") + '/subscriptions';

const SubService = {
    getSubscribedChannel: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/u/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching subscribed channels:", error.message);
            throw error
        }
    },
    getSubscribers: async ( channelId) => {
        try {
            const response = await axios.get(`${API_URL}/c/${channelId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching subscribers:", error.message);
            throw error
        }
    },
    toggleSubscription: async ({accessToken}, channelId) => {
        try {
            const response = await axios.post(`${API_URL}/c/${channelId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error toggling subscription:", error.message);
            throw error; 
        }
    }
}

export default SubService;
