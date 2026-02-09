import { useAuth } from "@/hooks/useAuth";
import { roles } from "@/constan/roles";

import SuperAdminSidebar from "./SuperAdminSidebar";
import BranchSidebar from "./BranchSidebar";

export default function Sidebar() {
  const { user } = useAuth();

  if (user?.role === roles.SUPER_ADMIN) {
    return <SuperAdminSidebar />;
  }

  return <BranchSidebar />;
}
