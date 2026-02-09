import { useContext } from "react";
import { PermissionContext } from "@/context/PermissionContext";

export const usePermission = () => useContext(PermissionContext);
