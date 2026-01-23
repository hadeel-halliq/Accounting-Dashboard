import api from "./api";

export const getBranches = () => api.get("/branches");
export const createBranche = (data) => api.post("/branches", data);
export const updateBranche = (id,data) => api.post(`/branches/${id}`, data);
export const toggleBranchStatus = (id) => api.patch(`/branches/${id}/toggle`);