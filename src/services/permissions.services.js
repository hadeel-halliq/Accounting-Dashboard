import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const PermissionsService = {
  
  getById: (permissionId) =>
    apiClient.get(`/permissions/${permissionId}`).then(unwrap),

  getUserPermissions: (userId) =>
    apiClient
      .get(`/permissions/user/${userId}`)
      .then(unwrap)
      .then((d) => d.permissions),

  create: (data) => apiClient.post("/permissions", data).then(unwrap),

  update: (permissionId, data) =>
    apiClient.put(`/permissions/${permissionId}`, data).then(unwrap),

  remove: (permissionId) =>
    apiClient.delete(`/permissions/${permissionId}`).then(unwrap),
};

export default PermissionsService;
