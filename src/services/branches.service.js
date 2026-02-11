import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const BranchesService = {
  list: (params) =>
  apiClient
    .get("/branches", { params })
    .then(unwrap),


  get: (id) => apiClient.get(`/branches/${id}`).then(unwrap),

  create: (data) => apiClient.post("/branches", data).then(unwrap),

  update: (id, data) => apiClient.put(`/branches/${id}`, data).then(unwrap),

  remove: (id) => apiClient.delete(`/branches/${id}`).then(unwrap),
};

export default BranchesService;
