import axios from "axios";
const BASE_URL= import.meta.env.MODE ==="development"?"http://localhost:5000/api":"/api"
const axiosInstance = axios.create({
  baseURL:BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
});

// Add token automatically if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
