import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { getPermissionsByRole } from "@/utils/permissions";

const PermissionContext = createContext(null);

export function PermissionProvider({ children }) {
  const { role } = useAuth();

  const permissions = getPermissionsByRole(role);

  return (
    <PermissionContext.Provider value={permissions}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  return useContext(PermissionContext);
}

