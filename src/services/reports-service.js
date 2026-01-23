import api from "./api";

export const getDashboardStats = () => api.get("/reports/dashboard");
export const getInventoryAudit = () => api.get("/reports/inventory-audit");
export const exportData = (params) => api.get("/reports/export", { params, responseType: 'blob' }); //JSON منشان السيرفر يرجع ملف مو 
