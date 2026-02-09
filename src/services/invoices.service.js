import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

export default {
  create: (data) => apiClient.post("/invoices", data).then(unwrap),
  list: (params) =>
    apiClient
      .get("/invoices", { params })
      .then(unwrap)
      .then((d) => d.invoices),
  get: (id) => apiClient.get(`/invoices/${id}`).then(unwrap),
  update: (id, data) => apiClient.put(`/invoices/${id}`, data).then(unwrap),
  remove: (id) => apiClient.delete(`/invoices/${id}`).then(unwrap),

  addItem: (invoiceId, item) =>
    apiClient.post(`/invoices/${invoiceId}/items`, item).then(unwrap),

  removeItem: (invoiceId, itemId) =>
    apiClient.delete(`/invoices/${invoiceId}/items/${itemId}`).then(unwrap),
};
