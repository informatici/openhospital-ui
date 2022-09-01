import { useUserPermissions } from "../../../../libraries/permissionUtils/useUserPermissions";
import { TTabConfig } from "../types";

const asArray = (input: string | string[]): string[] =>
  typeof input === "string" ? [input] : input;

/**
 * Returns only tabs that user can access:
 * - tabs without "checkPermissions" property
 * - tabs that match user's permissions
 */
export const useFilterPermission = (config: TTabConfig): TTabConfig => {
  const userPermissions = useUserPermissions();
  return config.filter((item) => {
    if (item.checkPermissions) {
      const checkPermissions = asArray(item.checkPermissions);
      return checkPermissions.find((permission) =>
        userPermissions.includes(permission)
      );
    }
    return true;
  });
};
