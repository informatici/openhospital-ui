import React from "react";
import { TPermission } from "../../types";
import { usePermissions } from "./usePermissions";

type TPermissionsProps = {
  require: Array<TPermission>;
};

export const Permissions: React.FC<TPermissionsProps> = ({
  children,
  require,
}) => {
  const hasPermissions = usePermissions(require);

  return hasPermissions ? <>{children}</> : null;
};
