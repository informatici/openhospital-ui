import { TPermission } from "../../types";
import { usePermissions } from "./usePermissions";

/**
 * @param name requested permission
 * @returns boolean true if user has permission
 */
export const usePermission = (name: TPermission): boolean => {
  const permissions = usePermissions();
  if (!process.env.ENABLE_PERMISSIONS) {
    return true;
  }
  return Boolean(permissions.find((permission: string) => permission === name));
};
