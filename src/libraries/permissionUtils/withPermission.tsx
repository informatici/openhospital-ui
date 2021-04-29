import React from "react";
import { PermissionDenied } from "../../components/accessories/permissionDenied/PermissionDenied";
import { TPermission } from "../../types";
import { usePermission } from "./usePermission";

/**
 * Render children only if user has permission
 * @param permission permission to check
 * @param Fallback component to display on permission denied
 * @returns children or Fallback
 */
export const withPermission = (
  permission: TPermission,
  Fallback: React.ComponentType = PermissionDenied
) => (Component: React.ComponentType): React.ComponentType => ({
  children,
  ...props
}) => {
  const hasPermission = usePermission(permission);

  return hasPermission ? (
    <Component {...props}>{children}</Component>
  ) : (
    <Fallback {...props} />
  );
};
