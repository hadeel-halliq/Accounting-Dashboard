// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
// import { roles } from "@/constan/roles";

// export default function RoleRoute({ allowedRoles }) {
//   const { user, loading } = useAuth();

//   if (loading) return null;

//   if (!allowedRoles.includes(user?.role)) {
//     return <Outlet/>;
//   }

//   if (!allowedRoles?.includes(user?.role)) {
//     return <Navigate to="/" replace/>
//   }
//   return <Outlet/>;
// }


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function RoleRoute({ allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  // إذا كانت رتبة المستخدم ضمن الرتب المسموح لها، مرره للمحتوى
  if (allowedRoles.includes(user?.role)) {
    return <Outlet />;
  }

  // إذا لم يكن مخولاً، أعده للصفحة الرئيسية
  return <Navigate to="/" replace />;
}