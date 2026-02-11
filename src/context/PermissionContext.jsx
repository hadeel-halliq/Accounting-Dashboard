import { createContext, useEffect, useState } from "react";
import PermissionsService from "@/services/permissions.services";
import { useAuth } from "@/hooks/useAuth";

export const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (!user) return;

    PermissionsService.getUserPermissions(user.userid)
      .then(setPermissions)
      .catch(() => setPermissions([]));
  }, [user]);

  /* =========================================
     table + action
     has("users", "view")
     has("users", "add")
  ========================================= */

  // const has = (table, action) => {
  //   //  super admin يشوف كل شيء
  //   if (user?.role === "SUPER-ADMIN") return true;

  //   const p = permissions.find((x) => x.targettable === table);
  //   if (!p) return false;

  //   return p[`can${action}`] === true;
  // };

  const has = (table, action = "view") => {
    if (user?.role === "SUPER-ADMIN") return true;

    const p = permissions.find((x) => x.targettable === table);
    if (!p) return false;

    const map = {
      view: "print",
      add: "add",
      edit: "edit",
      delete: "delete",
    };

    const key = map[action.toLowerCase()];
    return p[`can${key}`] === true;
  };

  return (
    <PermissionContext.Provider value={{ permissions, has }}>
      {children}
    </PermissionContext.Provider>
  );
};
