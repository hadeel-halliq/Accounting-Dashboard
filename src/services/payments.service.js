import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

export default {
  create: (data) => apiClient.post("/payments", data).then(unwrap),
  list: (params) => apiClient.get("/payments", { params }).then(unwrap),
  get: (id) => apiClient.get(`/payments/${id}`).then(unwrap),
  update: (id, data) => apiClient.put(`/payments/${id}`, data).then(unwrap),
};
