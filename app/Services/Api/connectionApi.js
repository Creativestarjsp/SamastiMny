// connectionApi.js
import axiosInstance from "./axios";

const connectionApi = {
  getAllconnections: async (token) => {
    try {
      const response = await axiosInstance.get(`/connection/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching connections:', error);
      throw error;
    }
  },

  getconnectionsRequests: async (token) => {
    try {
      const response = await axiosInstance.get(`/connection/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching connections:', error);
      throw error;
    }
  },

  createconnection: async (receiverId,token) => {
    try {
      console.log(receiverId,token,"APi ddadada")
      const response = await axiosInstance.post('/connection', { receiverId }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // console.error('Error creating connection:', error);
      throw error;
    }
  },

  removeconnection: async (receiverId, token) => {
    try {
      const response = await axiosInstance.post('/connections/removeconnection', { receiverId }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // console.error('Error removing connection:', error);
      throw error;
    }
  },

  connectionstatus_update: async (id, accepted, token) => {
  try {
    console.log(id, accepted, token, "ppppppppppppp")
    const response = await axiosInstance.put(`/connection/${id}/${accepted}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.error('Error updating connection status:', error);
    throw error;
  }
},

  mysavedprofiles: async (id, token) => {
    try {
      const response = await axiosInstance.get(`/match/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // console.error('Error fetching saved profiles:', error);
      throw error;
    }
  },

  removesavedprofile: async (id, token) => {
    try {
      const response = await axiosInstance.get(`/match/remove/${id}/remove`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // console.error('Error removing saved profile:', error);
      throw error;
    }
  },
};

export default connectionApi;
