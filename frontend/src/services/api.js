import axios from "axios";

// Central Axios instance. Once the backend (Express + MongoDB) connection is
// finalized, all services should route requests through this instance so the
// base URL, auth headers, and error handling stay in one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((response) => response, (error) => Promise.reject(error?.response?.data || { message: "Unable to reach the server." }));

export default api;
