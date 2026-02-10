import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const PermissionsService = {
  /* ================= user permissions ================= */
  getUserPermissions: (userId) =>
    apiClient
      .get(`/permissions/user/${userId}`)
      .then(unwrap)
      .then((d) => d.permissions),

  /* ================= single permission ================= */
  getById: (permissionId) =>
    apiClient.get(`/permissions/${permissionId}`).then(unwrap),

  /* ================= create ================= */
  create: (data) =>
    apiClient.post("/permissions", data).then(unwrap),

  /* ================= update ================= */
  update: (permissionId, data) =>
    apiClient.put(`/permissions/${permissionId}`, data).then(unwrap),

  /* ================= delete ================= */
  remove: (permissionId) =>
    apiClient.delete(`/permissions/${permissionId}`).then(unwrap),
};

export default PermissionsService;


