import axiosInstance from "./axios";

const generalApi = {
  getgeneraldata: async (type) => {
    try {
      const response = await axiosInstance.get(`/general/types/${type}`);
      return response.data; // Assuming the response contains the profile data
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error; // Re-throw the error for handling in the calling component
    }
  },
};

export default generalApi;
