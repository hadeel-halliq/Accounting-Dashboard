export const roles = {
  SUPER_ADMIN: "SUPER-ADMIN",
  ADMIN: "ADMIN",
  USER: "USER", 
};

export const adminLinks = [
  { table: "users", label: "المستخدمون", path: "/users" },
  { table: "products", label: "المنتجات", path: "/products" },
  { table: "customers", label: "العملاء", path: "/customers" },
  { table: "invoices", label: "الفواتير", path: "/invoices" },
  { table: "payments", label: "المدفوعات", path: "/payments" },
  { table: "returns", label: "المرتجعات", path: "/returns" },
  { table: "logs", label: "السجلات", path: "/logs" },
];
