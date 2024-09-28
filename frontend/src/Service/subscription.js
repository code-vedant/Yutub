import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/subscriptions';

const SubService = {
    getSubscribedChannel: async (accessToken, userId) => {
        try {
            const response = await axios.get(`${API_URL}/u/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching subscribed channels:", error.message);
        }
    },
    getSubscibers: async (accessToken, channelId) => {
        try {
            const response = await axios.get(`${API_URL}/c/${channelId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching subscribers:", error.message);
        }
    },
    toggleSubscription: async (accessToken, channelId) => {
        try {
            const response = await axios.post(`${API_URL}/c/${channelId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error toggling subscription:", error.message);
        }
    }
}

export default SubService;
