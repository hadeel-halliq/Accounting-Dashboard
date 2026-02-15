import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

export default {
  create: (data) => apiClient.post("/categories", data).then(unwrap),
  list: (params) => apiClient.get("/categories", { params }).then(unwrap),
  getAll: () =>
    apiClient
      .get("/categories", { params: { page: 1, limit: 100 } })
      .then(unwrap),
  get: (id) => apiClient.get(`/categories/${id}`).then(unwrap),
  update: (id, data) => apiClient.put(`/categories/${id}`, data).then(unwrap),
  remove: (id) => apiClient.delete(`/categories/${id}`).then(unwrap),
  delete: (id) => apiClient.delete(`/categories/${id}`).then(unwrap),
};
