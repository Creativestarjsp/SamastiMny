import axios from 'axios';
const BASE_URL = 'https://samasti.up.railway.app/api'; // Replace with your actual API endpoint
const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  
export default axiosInstance;
  
// const BASE_URL = 'https://samasti.up.railway.app/api';'http://192.168.1.20:3000/api'http://172.20.10.3:3000/api