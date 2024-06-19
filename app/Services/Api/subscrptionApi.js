// subscriptionApi.js
import axiosInstance from "./axios";

const subscriptionApi = {
  getSubscriptions: async (token) => {
    try {
      const response = await axiosInstance.get(`/subscription/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },
};

export default subscriptionApi;
