import { TPermission } from "../../types";
import { usePermissions } from "./usePermissions";

/**
 * @param names requested permissions
 * @returns boolean true if user has at less one of specified permissions
 */
export const useAlternativePermissions = (names: TPermission[]): boolean => {
  const permissions = usePermissions();

  if (!process.env.ENABLE_PERMISSIOM) {
    return true;
  }

  return (
    permissions.filter((permission: string) =>
      names.includes(permission as TPermission)
    ).length > 0
  );
};
