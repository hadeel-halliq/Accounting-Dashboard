import { NavLink } from "react-router-dom";
import { usePermission } from "@/hooks/usePermission";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg text-sm transition
   ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`;

export default function BranchSidebar() {
  const { has } = usePermission();

  return (
    <div className="h-full w-64 border-l bg-card p-4 space-y-2" dir="rtl">

      <NavLink to="/" className={linkClass}>
        لوحة التحكم
      </NavLink>

      {has("users", "View") && <NavLink to="/users" className={linkClass}>المستخدمون</NavLink>}
      {has("products", "View") && <NavLink to="/products" className={linkClass}>المنتجات</NavLink>}
      {has("categories", "View") && <NavLink to="/categories" className={linkClass}>التصنيفات</NavLink>}
      {has("customers", "View") && <NavLink to="/customers" className={linkClass}>العملاء</NavLink>}
      {has("invoices", "View") && <NavLink to="/invoices" className={linkClass}>الفواتير</NavLink>}
      {has("payments", "View") && <NavLink to="/payments" className={linkClass}>المدفوعات</NavLink>}
      {has("returns", "View") && <NavLink to="/returns" className={linkClass}>المرتجعات</NavLink>}
      {has("logs", "View") && <NavLink to="/logs" className={linkClass}>السجلات</NavLink>}
    </div>
  );
}
