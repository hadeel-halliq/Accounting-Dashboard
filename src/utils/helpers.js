/*
   Formatting Helpers
 */

/**
 * تنسيق التاريخ لعرضه في الجداول، الفواتير، التقارير
 * الهدف: توحيد شكل التاريخ في كل الواجهة
 * الاستخدام: عرض فقط (ليس للحسابات)
 */
export function formatDate(date, locale = "en-GB") {
  if (!date) return "-"; // حماية من القيم الفارغة
  return new Date(date).toLocaleDateString(locale);
}

/**
 * تنسيق الأرقام الكبيرة (مثل الكميات، الأسعار)
 * الهدف: جعل الأرقام مقروءة للمستخدم (1,000 بدل 1000)
 */
export function formatNumber(value) {
  if (value == null || isNaN(value)) return "0";
  return Number(value).toLocaleString();
}

/**
 * تنسيق مبلغ مالي مع العملة
 * الهدف: عرض السعر بشكل واضح بدون منطق مالي
 * العملة تأتي من البيانات (ليست ثابتة)
 */
export function formatCurrency(value, currency = "") {
  if (value == null || isNaN(value)) return `0 ${currency}`;
  return `${Number(value).toLocaleString()} ${currency}`;
}

/**
 * حماية الواجهة من النصوص الفارغة أو null
 * الهدف: منع ظهور قيم مكسورة في الجداول
 */
export function safeText(value) {
  return value ?? "-";
}

/**
 * تحويل true / false لنص مفهوم للمستخدم
 * الهدف: عرض القيم المنطقية بشكل واضح
 */
export function yesNo(value) {
  return value ? "نعم" : "لا";
}

/*
   Enum Helpers
*/

/**
 * البحث عن عنصر داخل enum باستخدام code
 * الهدف: إيجاد العنصر الصحيح القادم من السيرفر
 * مثال: paid → { code: "paid", name: "مدفوعة" }
 */
export function findEnumByCode(list = [], code) {
  return list.find((item) => item.code === code) || null;
}

/**
 * جلب الاسم (label) المناسب للعرض من enum
 * الهدف: عرض اسم مفهوم بدل الكود التقني
 * مثال: "paid" → "مدفوعة"
 */
export function getEnumLabel(list = [], code, fallback = "-") {
  return findEnumByCode(list, code)?.name ?? fallback;
}

/**
 * جلب اللون المناسب من enum (للـ Badge أو الحالة)
 * الهدف: توحيد ألوان الحالات في كل الواجهة
 */
export function getEnumColor(list = [], code, fallback = "default") {
  return findEnumByCode(list, code)?.color ?? fallback;
}

/**
 * تحويل enum إلى options جاهزة للاستخدام في Select (shadcn)
 * الهدف: تقليل التكرار وتحضير البيانات للـ UI
 */
export function enumsToOptions(list = []) {
  return list.map((item) => ({
    label: item.name,
    value: item.code,
  }));
}
