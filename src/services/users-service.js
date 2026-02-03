import api from "./api";

export const getUsers = (params) => api.get("/users", { params });

export const getUserById = (id) => api.get(`/users/${id}`);

export const toggleUserStatus = (id, data) =>
  api.put(`/users/${id}/toggle-status`, data);
