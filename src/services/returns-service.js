import api from "./api";

// إنشاء مرتجع مع العناصر
export const createReturn = (data) =>
  api.post("/returns", data);

// جلب كل المرتجعات
export const getReturns = (params) =>
  api.get("/returns", { params });

// جلب مرتجع واحد
export const getReturnById = (id) =>
  api.get(`/returns/${id}`);

// تحديث حالة المرتجع (PENDING → COMPLETED)
export const updateReturnStatus = (id, data) =>
  api.put(`/returns/${id}`, data);

// حذف مرتجع كامل
export const deleteReturn = (id) =>
  api.delete(`/returns/${id}`);
