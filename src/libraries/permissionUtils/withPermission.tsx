import React from "react";
import { PermissionDenied } from "../../components/accessories/permissionDenied/PermissionDenied";
import { TPermission } from "../../types";
import { usePermission } from "./usePermission";

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
