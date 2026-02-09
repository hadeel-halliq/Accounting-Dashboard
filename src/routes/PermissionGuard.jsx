import { usePermission } from "@/hooks/usePermission";

export default function PermissionGuard({ permission, children }) {
  const { has } = usePermission();

  if (!has(permission)) return null;

  return children;
}
