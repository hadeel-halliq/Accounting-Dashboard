import api from "./api";

export const createInvoiceItem = (data) => api.post("/invoice-items", data);
export const updateInvoiceItem = (id, data) => api.put(`/invoice-items/${id}`, data);
export const deleteInvoiceItem = (id) => api.delete(`/invoice-items/${id}`);
