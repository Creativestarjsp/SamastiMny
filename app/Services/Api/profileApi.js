// profileApi.js
import axiosInstance from "./axios";

const profileApi = {
  getprofile: async (token) => {
    try {
      const response = await axiosInstance.get(`/profile/myprofile`, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  getminprofile: async (token) => {
    try {
      const response = await axiosInstance.get(`/profile/myprofile/home`, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  getuserprofile: async (id,token) => {
    try {
      const response = await axiosInstance.get(`/user/${id}`, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  getpartnerpref: async (token) => {
    try {
      const response = await axiosInstance.get(`/partnerpref/mypreferences`, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
  updatePreferences: async (token,data) => {
    try {
      const {education,occupation,
        professionarea,
        workingIn,
        incomeRange,
        religion,
        community,
        mothertongue,
        country,
        state,
        city} = data
      const response = await axiosInstance.put(`/partnerpref/partner`,{
        education,
        occupation,
        professionarea,
        workingIn,
        incomeRange,
        religion,
        community,
        mothertongue,
        country,
        state,
        city}, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
  getprofiles: async (token,page) => {
    try {
      const response = await axiosInstance.post(`/match/searchProfiles`, {
        minAge: 18,
        maxAge: 23,
        maritalStatus: "Single",
        page
  
      }, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },
    get_matchprofiles: async (token,page) => {
    try {
      const response = await axiosInstance.get(`/profile/match/profiles/users`,{
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },

     get_nearby: async (token,page) => {
    try {
      const response = await axiosInstance.get(`/match/nearby/matches`,{
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },

  updateabout: async (token,about) => {
    try {
      const response = await axiosInstance.put(`/profile/about`, {
       about
  
      }, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },
  updatebasicdetails: async (token,data) => {
    try {
      const {maritalStatus,
        height,
        disability,
        healthinfo,
        religion,
        mothertongue,
        blood_group,
        community,
        residencystatus,
      grewupcountry,
          country,
          state,
          city,
          diet} = data
      const response = await axiosInstance.put(`/profile/update`, {
        maritalStatus,
        height,
        disability,
        healthinfo,
        religion,
        mothertongue,
        community,
        blood_group,
        residencystatus,
        grewupcountry,
          country,
          state,
          city,
          diet  
      }, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },

  updatecareer: async (token,data) => {
    try {
      const {qualification,
        occupation,
        workingin,
        employer_name,
        college,
        income
      } = data
      const response = await axiosInstance.put(`/profile/profiles/career`, {
        qualification,
       occupation,
        workingin,
        employer_name,
        college,
       income
  
      }, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },
  updatefamily: async (token,data) => {
    try {
      const {fatherstatus,
        motherstatus,
        nativeplace,
        noofbro,
        noofsis,
        familytype,
        familyvalues,
        familyaffluence}=data
      const response = await axiosInstance.put(`/profile/family`, {
        fatherstatus,
        motherstatus,
        nativeplace,
        noofbro,
        noofsis,
        familytype,
        familyvalues,
        familyaffluence
  
      }, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },
    AllNotifications: async (token) => {
    try {
      const response = await axiosInstance.get(`/user/notification/allstatus`, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
    
     smsNotification: async (token) => {
    try {
      const response = await axiosInstance.get(`/user/sms/notification/status`, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
     emailNotification: async (token) => {
    try {
      const response = await axiosInstance.get(`/user/email/notification/status`, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
     
        pushNotification: async (token) => {
    try {
      const response = await axiosInstance.get(`/user/push/notification/status`, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
        
        image_upload: async (token,image) => {
    try {
      const response = await axiosInstance.put(`/upload`, {
       image
  
      }, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },

   updateHoroscope : async (token, horoscopeDetails) => {
  try {
    const response = await axiosInstance.put(
      '/profile/update/horo/scope/s',
      horoscopeDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating horoscope details:', error);
    throw error;
  }
  },
   
    updateImagePrivacy: async (token,imageprivacy) => {
    try {
      const response = await axiosInstance.put(`/profiles/update-image-privacy`, {
       imageprivacy
  
      }, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },
 updatecontactPrivacy: async (token,contactprivacy) => {
    try {
      const response = await axiosInstance.put(`/profiles/update-contact-privacy`, {
       contactprivacy
  
      }, {
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },
 
  searchUsername: async (token,username) => {
    try {
      const response = await axiosInstance.get(`/user/search/${username}`,{
        headers: {
          // Include any headers you need, e.g., authorization token
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  },
};




export default profileApi;
