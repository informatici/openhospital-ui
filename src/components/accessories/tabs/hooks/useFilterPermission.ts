import { usePermissions } from "../../../../libraries/permissionUtils/usePermissions";
import { TTabConfig } from "../types";

const asArray = (input: string | string[]): string[] =>
  typeof input === "string" ? [input] : input;

/**
 * Returns only tabs that user can access:
 * - tabs without "checkPermissions" property
 * - tabs that match user's permissions
 */
export const useFilterPermission = (config: TTabConfig): TTabConfig => {
  const permissions = usePermissions();
  return config.filter((item) => {
    if (item.checkPermissions) {
      const checkPermissions = asArray(item.checkPermissions);
      return checkPermissions.find((permission) =>
        permissions.includes(permission)
      );
    }
    return true;
  });
};
