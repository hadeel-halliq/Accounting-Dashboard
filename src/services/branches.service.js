import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

export default {
  create: (data) => apiClient.post("/branches", data).then(unwrap),
  list: (params) =>
    apiClient
      .get("/branches", { params })
      .then(unwrap)
      .then((d) => d.branches),
  get: (id) => apiClient.get(`/branches/${id}`).then(unwrap),
  update: (id, data) => apiClient.put(`/branches/${id}`, data).then(unwrap),
  remove: (id) => apiClient.delete(`/branches/${id}`).then(unwrap),
};
