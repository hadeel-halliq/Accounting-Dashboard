import { NavLink } from "react-router-dom";
import { usePermission } from "../../hooks/usePermission";

const linkClass =
  "block px-4 py-2 rounded-lg hover:bg-muted text-sm";

export default function Sidebar() {
  const { has } = usePermission();

  return (
    <div className="w-60 border-r bg-white p-4 space-y-2">

      <NavLink className={linkClass} to="/">Dashboard</NavLink>

      {has("users", "View") && (
        <NavLink className={linkClass} to="/users">Users</NavLink>
      )}

      {has("products", "View") && (
        <NavLink className={linkClass} to="/products">Products</NavLink>
      )}

      {has("categories", "View") && (
        <NavLink className={linkClass} to="/categories">Categories</NavLink>
      )}

      {has("customers", "View") && (
        <NavLink className={linkClass} to="/customers">Customers</NavLink>
      )}

      {has("invoices", "View") && (
        <NavLink className={linkClass} to="/invoices">Invoices</NavLink>
      )}

      {has("payments", "View") && (
        <NavLink className={linkClass} to="/payments">Payments</NavLink>
      )}

      {has("returns", "View") && (
        <NavLink className={linkClass} to="/returns">Returns</NavLink>
      )}

      {has("logs", "View") && (
        <NavLink className={linkClass} to="/logs">Logs</NavLink>
      )}

      {has("branches", "View") && (
        <NavLink className={linkClass} to="/branches">Branches</NavLink>
      )}

      {has("subscriptions", "View") && (
        <NavLink className={linkClass} to="/subscriptions">Subscriptions</NavLink>
      )}
    </div>
  );
}
