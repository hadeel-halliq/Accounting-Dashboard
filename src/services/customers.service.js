import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const CustomersService = {
  create: (data) =>
    apiClient.post("/customers", data).then(unwrap),

  list: (params) =>
    apiClient
      .get("/customers", { params })
      .then(unwrap), //  رجع كل data مش بس customers

  get: (id) =>
    apiClient.get(`/customers/${id}`).then(unwrap),

  update: (id, data) =>
    apiClient.put(`/customers/${id}`, data).then(unwrap),

  remove: (id) =>
    apiClient.delete(`/customers/${id}`).then(unwrap),
};

export default CustomersService;



