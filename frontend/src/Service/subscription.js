import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/subscriptions";

const SubService = {
    getSubscribedChannel: async (accessToken, userId) => {
        try {
            const response = await axios.get(`${API_URL}/u/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("Fetched subscribed channels successfully");
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
            console.log("Fetched subscribers successfully");
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
            console.log("Toggled subscription successfully");
            return response.data;
        } catch (error) {
            console.error("Error toggling subscription:", error.message);
        }
    }
}

export default SubService;
