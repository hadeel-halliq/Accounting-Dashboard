import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

export default {
  create: (data) => apiClient.post("/products", data).then(unwrap),
  list: (params) => apiClient.get("/products", { params }).then(unwrap),
  get: (id) => apiClient.get(`/products/${id}`).then(unwrap),
  update: (id, data) => apiClient.put(`/products/${id}`, data).then(unwrap),
  remove: (id) => apiClient.delete(`/products/${id}`).then(unwrap),
  delete: (id) => apiClient.delete(`/products/${id}`).then(unwrap),
};
