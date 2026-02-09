import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

export default {
  create: (data) => apiClient.post("/returns", data).then(unwrap),
  list: (params) => apiClient.get("/returns", { params }).then(unwrap),
  get: (id) => apiClient.get(`/returns/${id}`).then(unwrap),
};
