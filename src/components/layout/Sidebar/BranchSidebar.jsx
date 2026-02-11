import { NavLink } from "react-router-dom";
import { usePermission } from "@/hooks/usePermission";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg text-sm transition
   ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`;

export default function BranchSidebar() {
  const { has } = usePermission();

  return (
    <div
      className="h-full w-64 border-l bg-card p-4 space-y-2"
      dir="rtl"
    >
      {/* dashboard */}
      <NavLink to="/" className={linkClass}>
        لوحة التحكم
      </NavLink>

      {/* users */}
      {has("users", "view") && (
        <NavLink to="/users" className={linkClass}>
          المستخدمون
        </NavLink>
      )}

      {/* products */}
      {has("products", "view") && (
        <NavLink to="/products" className={linkClass}>
          المنتجات
        </NavLink>
      )}

      {/* categories */}
      {has("categories", "view") && (
        <NavLink to="/categories" className={linkClass}>
          التصنيفات
        </NavLink>
      )}

      {/* customers */}
      {has("customers", "view") && (
        <NavLink to="/customers" className={linkClass}>
          العملاء
        </NavLink>
      )}

      {/* invoices */}
      {has("invoices", "view") && (
        <NavLink to="/invoices" className={linkClass}>
          الفواتير
        </NavLink>
      )}

      {/* payments */}
      {has("payments", "view") && (
        <NavLink to="/payments" className={linkClass}>
          المدفوعات
        </NavLink>
      )}

      {/* returns */}
      {has("returns", "view") && (
        <NavLink to="/returns" className={linkClass}>
          المرتجعات
        </NavLink>
      )}
    </div>
  );
}
