import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserPermissions } from "@/services/permissions-services";

const PermissionContext = createContext(null);

export function PermissionProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // helper function: هل عند المستخدم صلاحية معينة؟
  function hasPermission(resource, action) {
    return permissions.some(
      (p) => p.resource === resource && p[action] === true
    );
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setPermissions([]);
      setLoading(false);
      return;
    }

    async function loadPermissions() {
      try {
        const res = await getUserPermissions(user.id);
        setPermissions(res.data?.data ?? []);
      } catch (err) {
        console.error("Failed to load permissions", err);
        setPermissions([]);
      } finally {
        setLoading(false);
      }
    }

    loadPermissions();
  }, [isAuthenticated, user?.id]);

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        loading,
        hasPermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within PermissionProvider");
  }
  return context;
}
