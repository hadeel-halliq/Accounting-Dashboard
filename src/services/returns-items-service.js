import api from "./api";

export const createReturnItem = (data) => api.post("/return-items", data);
export const updateReturnItem = (id,data) => api.post(`/return-items/${id}`, data);
export const deleteReturnItem = (id) => api.delete(`/return-items/${id}`)