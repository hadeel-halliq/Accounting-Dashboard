/** تنسيق تاريخ (للفواتير، الأقساط، التقارير) **/
export function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-GB");
}

/** تنسيق رقم مالي **/
export function formatNumber(value) {
  if (value == null) return "0";
  return Number(value).toLocaleString();
}

/** تنسيق مبلغ + عملة **/
export function formatCurrency(value, currency = "₺") {
  if (value == null) return `0 ${currency}`;
  return `${Number(value).toLocaleString()} ${currency}`;
}

/** تحويل حالة الفاتورة لنص مفهوم للمستخدم **/
export function getInvoiceStatusLabel(status) {
  const map = {
    paid: "مدفوعة",
    unpaid: "غير مدفوعة",
    installment: "تقسيط",
  };
  return map[status] || status;
}

/**
 * لون حالة الفاتورة (لـ badge)
 */
export function getInvoiceStatusColor(status) {
  const map = {
    paid: "success",
    unpaid: "destructive",
    installment: "warning",
  };
  return map[status] || "default";
}

/**
 * حساب مجموع عناصر الفاتورة
 */
export function calculateInvoiceTotal(items = []) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

/**
 * حماية من نصوص فاضية في الجداول
 */
export function safeText(value) {
  return value || "-";
}

/**
 * تحويل true / false لنص واضح
 */
export function yesNo(value) {
  return value ? "نعم" : "لا";
}
