// chatApi.js
import axiosInstance from "./axios";

const chatApi = {
  getAllconversations: async (token) => {
    try {
      const response = await axiosInstance.get(`/conversation/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },
  getAllMessages: async (token,convID) => {
    try {
      const response = await axiosInstance.get(`/message/messages/${convID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },
  createMessage: async (token,message) => {
    try {
      const response = await axiosInstance.post('/message/send', message, {
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

export default chatApi;
