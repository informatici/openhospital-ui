import { TPermission } from "../../types";
import { useUserPermissions } from "./useUserPermissions";

/**
 * @param name requested permission
 * @returns boolean true if user has permission
 */
export const usePermissions = (permissions: Array<TPermission>): boolean => {
  const userPermissions = useUserPermissions();

  return Boolean(permissions.every((p) => userPermissions.includes(p)));
};
