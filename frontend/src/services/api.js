import axios from "axios";

// Central Axios instance for CryptoWeb
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Bearer Token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Standardize API error payload
api.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      error?.response?.data || { message: "Unable to reach the server." }
    )
);

export default api;