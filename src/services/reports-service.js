import api from "./api";

/**
 * إحصائيات لوحة التحكم الرئيسية
 * endpoint:
 * GET /reports/dashboard
 *
 * الاستخدام:
 * - عدد الفواتير
 * - إجمالي المبيعات
 * - عدد الزبائن
 * - مؤشرات سريعة للداشبورد
 */
export const getDashboardStats = () => {
  return api.get("/reports/dashboard");
};

/**
 * تقرير تدقيق المخزون
 * endpoint:
 * GET /reports/inventory-audit
 *
 * params (اختياري):
 * - branch_id
 * - product_id
 * - from_date
 * - to_date
 *
 * الهدف:
 * - معرفة حركة المخزون
 * - الكميات الداخلة والخارجة
 */
export const getInventoryAudit = (params) => {
  return api.get("/reports/inventory-audit", { params });
};

/**
 * تصدير التقارير (Excel / PDF)
 * endpoint:
 * GET /reports/export
 *
 * params:
 * - type (inventory / sales / invoices ...)
 * - branch_id
 * - from_date
 * - to_date
 *
 * مهم جداً:
 * responseType: "blob"
 * لأن السيرفر يرجّع ملف وليس JSON
 */
export const exportReport = (params) => {
  return api.get("/reports/export", {
    params,
    responseType: "blob", // لازم حتى نقدر ننزّل الملف
  });
};
