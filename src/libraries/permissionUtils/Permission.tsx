import React, { PropsWithChildren } from "react";
import { TPermission } from "../../types";
import { usePermission } from "./usePermission";

type TPermissionProps = {
  require: TPermission;
};

export const Permission: React.FC<PropsWithChildren<TPermissionProps>> = ({
  children,
  require,
}) => {
  const hasPermission = usePermission(require);

  return hasPermission ? <>{children}</> : null;
};
