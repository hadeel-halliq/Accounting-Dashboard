import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { roles } from "@/constan/roles";

export default function RoleRoute({ allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!allowedRoles.includes(user?.role)) {
    return <Outlet/>;
  }

  if (!allowedRoles?.includes(user?.role)) {
    return <Navigate to="/" replace/>
  }
  return <Outlet/>;
}
