import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg text-sm transition
   ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`;

export default function SuperAdminSidebar() {
  return (
    <div className="h-full w-64 border-l bg-card p-4 space-y-2" dir="rtl">

      <NavLink to="/" className={linkClass}>
        لوحة التحكم
      </NavLink>

      <NavLink to="/users" className={linkClass}>
       المستخدمون
      </NavLink>

      <NavLink to="/branches" className={linkClass}>
        الفروع
      </NavLink>

      <NavLink to="/subscriptions" className={linkClass}>
        الاشتراكات
      </NavLink>

      <NavLink to="/logs" className={linkClass}>
        السجلات
      </NavLink>
    </div>
  );
}
