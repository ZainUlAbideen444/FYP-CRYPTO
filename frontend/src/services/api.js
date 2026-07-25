import axios from "axios";

// Central Axios instance. Once the backend (Express + MongoDB) connection is
// finalized, all services should route requests through this instance so the
// base URL, auth headers, and error handling stay in one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("cryptoweb_auth_user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
