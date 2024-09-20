import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/subscriptions";

const SubService = {
    getSubs : async (accessToken, userId) => {
        try {
            const response = await axios.get(`${API_URL}/u/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            
        }
    },
    getSubscribedChannel: async (accessToken,channelId) => {
        try {
            const response = await axios.get(`${API_URL}/c/${channelId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            
        }
    },
    toggleSubscription: async (accessToken, channelId) => {
        try {
            const response = await axios.put(`${API_URL}/c/${channelId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error.message);
            
        }
    }
}

export default SubService;