import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const UsersService = {
  list: (params) => apiClient.get("/users", { params }).then(unwrap),

  get: (id) => apiClient.get(`/users/${id}`).then(unwrap),

  update: (id, data) => apiClient.put(`/users/${id}`, data).then(unwrap),

  toggleActive: (id, isactive) =>
    apiClient.put(`/users/${id}/toggle-status`, { isactive }).then(unwrap),

  resetPassword: (id, newpassword) =>
    apiClient.put(`/users/${id}/reset-password`, { newpassword }).then(unwrap),
};

export default UsersService;