import { Navigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermission";
import { useAuth } from "@/hooks/useAuth";
import { roles } from "@/constan/roles";
export default function PermissionGuard({
  table,
  action = "view",
  children,
}) {
  const { user } = useAuth();
  const { has } = usePermission();

  if(user?.role === roles.SUPER_ADMIN) {
    return children
  }
  if (!has(table, action)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
