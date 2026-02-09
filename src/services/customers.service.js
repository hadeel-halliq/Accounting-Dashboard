import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

export default {
  create: (data) => apiClient.post("/customers", data).then(unwrap),
  list: (params) => apiClient.get("/customers", { params }).then(unwrap).then((d) => d.customers),
  get: (id) => apiClient.get(`/customers/${id}`).then(unwrap),
  update: (id, data) => apiClient.put(`/customers/${id}`, data).then(unwrap),
  remove: (id) => apiClient.delete(`/customers/${id}`).then(unwrap),
};

