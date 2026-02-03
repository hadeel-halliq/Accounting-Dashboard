import api from "./api";

export const getUserPermissions = (userId) =>
  api.get(`/permissions/user/${userId}`);

export const createPermission = (data) => api.post("/permissions", data);

export const updatePermission = (id, data) =>
  api.put(`/permissions/${id}`, data);

export const deletePermission = (id) => api.delete(`/permissions/${id}`);
