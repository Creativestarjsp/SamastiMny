// chatApi.js
import axiosInstance from "./axios";

const paymentAPI = {
 
 

  payment: async (token,subscriptionId) => {
    try {
        const response = await axiosInstance.post('/orders', { subscriptionId: subscriptionId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  },
  
  
};

export default paymentAPI;
