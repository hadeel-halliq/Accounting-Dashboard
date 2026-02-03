import api from "./api";

// جلب كل الفئات مع pagination
export const getCategories = (page = 1, limit = 10) =>
  api.get(`/categories?page=${page}&limit=${limit}`);

// إنشاء فئة جديدة
export const createCategory = (data) =>
  api.post("/categories", data); 
// data = { categoryname, branchid, origincountry }

// تعديل فئة موجودة
export const updateCategory = (id, data) =>
  api.put(`/categories/${id}`, data);

// حذف فئة
export const deleteCategory = (id) =>
  api.delete(`/categories/${id}`);
