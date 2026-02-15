import { useAuth } from "@/hooks/useAuth";
import { roles } from "@/constan/roles";
import DashboardSuperadmin from "./DashboardSuperadmin";
import DashboardAdmin from "./DashboardAdmin";

export default function DashboardPage() {
  const { user: currentUser } = useAuth();

  if (currentUser?.role === roles.SUPER_ADMIN) {
    return <DashboardSuperadmin />;
  }

  return <DashboardAdmin />;
}
