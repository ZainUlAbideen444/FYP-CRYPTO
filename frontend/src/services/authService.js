import api from "./api";
export const register = (payload) => api.post("/auth/register", payload).then((response) => response.data);
export const login = (payload) => api.post("/auth/login", payload).then((response) => response.data);
export const logout = () => api.post("/auth/logout");
export const getCurrentUser = () => api.get("/auth/me").then((response) => response.data.user);
