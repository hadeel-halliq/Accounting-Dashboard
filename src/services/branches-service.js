import api from "./api";

// جلب كل الفروع
export const getBranches = (page = 1, limit = 10) =>
  api.get(`/branches?page=${page}&limit=${limit}`);

// إنشاء فرع جديد
export const createBranch = (data) => api.post("/branches", data);

// تعديل فرع موجود
export const updateBranch = (id, data) => api.put(`/branches/${id}`, data);

// تبديل حالة الفرع (active / inactive)
export const toggleBranchStatus = (id) =>
  api.patch(`/branches/${id}/toggle-status`);
