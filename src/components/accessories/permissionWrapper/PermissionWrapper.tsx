import React, { FC } from "react";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";
import { AlertBox } from "../alertBox/AlertBox";
import { CustomPermissionDenied } from "../customPermissionDenied/CustomPermissionDenied";
import { PermissionDenied } from "../permissionDenied/PermissionDenied";
import { IOwnProps } from "./types";

export const PermissionWrapper: FC<IOwnProps> = ({
  fallback = <CustomPermissionDenied />,
  permission,
  children,
}) => {
  const canAccess = usePermission(permission);
  return <>{canAccess === true ? children : fallback}</>;
};
