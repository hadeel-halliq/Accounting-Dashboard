import { Navigate } from "react-router-dom";
import { usePermission } from "@/hooks/usePermission";

export default function PermissionGuard({
  table,
  action = "view",
  children,
}) {
  const { has } = usePermission();

  if (!has(table, action)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
