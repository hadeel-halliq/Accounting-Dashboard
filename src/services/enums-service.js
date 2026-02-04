import api from "./api";

/**
 * Units (قطعة – دزينة – صندوق)
 * مرتبطة بالفرع
 */
export const getUnits = (branchId) => {
  return api.get("/enums/units", {
    params: branchId ? { branch_id: branchId } : undefined,
  });
};

/**
 * Payment Methods (كاش – حوالة – سيريتل كاش ...)
 */
export const getPaymentMethods = () => {
  return api.get("/enums/payment-methods");
};

/**
 * Invoice Statuses
 * (قيد التجهيز – تم الشحن – ملغاة ...)
 */
export const getInvoiceStatuses = () => {
  return api.get("/enums/invoice-statuses");
};

/**
 * Invoice Types
 * (بيع – شراء – مرتجع – مصروف ...)
 */
export const getInvoiceTypes = () => {
  return api.get("/enums/invoice-types");
};
