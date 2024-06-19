import axiosInstance from "./axios";

const authApi = {
  getcountries: (page, pageSize) => {
    // Replace 'your_countries_endpoint' with the actual endpoint for fetching countries
    return axiosInstance.get(`/general/types/Country?page=${page}&pageSize=${pageSize}`);
  },

  loginwithotp: (phoneNumber, otp) => {
    // Replace 'your_login_with_otp_endpoint' with the actual endpoint for OTP login
    return axiosInstance.post('your_login_with_otp_endpoint', { phoneNumber, otp });
  },
  generatehotp: (country_code,phoneNumber) => {
    // Replace 'your_login_with_otp_endpoint' with the actual endpoint for OTP login
    return axiosInstance.post('/generateotp', { country_code:country_code,phone:phoneNumber});
  },
  register: (userData) => {
    // Replace 'your_register_endpoint' with the actual endpoint for user registration
    return axiosInstance.post('/register', userData);
  },

  phoneverify: (country_code,phoneNumber, otp,notificationToken) => {
    // Replace 'your_phone_verify_endpoint' with the actual endpoint for phone verification
    return axiosInstance.post('/noti', {country_code,phone:phoneNumber, otp,notificationToken:notificationToken });
  },
};

export default authApi;
