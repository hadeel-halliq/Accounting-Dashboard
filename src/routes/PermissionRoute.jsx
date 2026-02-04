import { Navigate } from "react-router-dom";
import { usePermissions } from "@/context/PermissionContext";

/**
 * Route Guard based on permissions
 * يسمح بالدخول فقط إذا المستخدم يملك الصلاحية المطلوبة
 */
export default function PermissionRoute({
  resource,
  action,
  children,
}) {
  const { hasPermission, loading } = usePermissions();

  // أثناء تحميل الصلاحيات
  if (loading) {
    return null; // أو Loader إذا حابة
  }

  // إذا ما عنده الصلاحية
  if (!hasPermission(resource, action)) {
    return <Navigate to="/" replace />;
  }

  // مسموح
  return children;
}
