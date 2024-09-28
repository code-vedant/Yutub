import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/dashboard';

const DashboardService = {
    getChannelStat: async (accessToken) => {
        try {
            const response = await axios.get(`${API_URL}/stats`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching channel stats:", error);
            throw error;
        }
    },
    getChannelVideo: async (accessToken)=> {
        try {
            const response = await axios.get(`${API_URL}/videos`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching channel videos:", error);
            throw error;
        }
    },
}

export default DashboardService;