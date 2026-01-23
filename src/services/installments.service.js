import api from "./api";

export const getInstallments = (params) => api.get("/installments", {params});
export const addInstallments = (data) => api.post("/installments", data);
export const updateInstallment = (id, data) => api.put(`/installment/${id}`, data)