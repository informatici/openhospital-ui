import React from "react";

import { PermissionDTO } from "../../../../../generated";
import { PermissionCheckbox } from "./PermissionCheckbox";
import { PermissionActionEnum } from "./permission.utils";

interface IProps {
  permissions: PermissionDTO[];
  groupPermissions: PermissionDTO[];
  onChange: (permission: PermissionDTO, action: PermissionActionEnum) => void;
}
export const AreaAccess = ({
  permissions,
  groupPermissions,
  onChange,
}: IProps) => {
  return (
    <ul>
      {permissions
        .filter(
          (perm: PermissionDTO) => perm.name && /\.access$/.test(perm.name)
        )
        .map((perm, index) => (
          <li key={index}>
            <PermissionCheckbox
              permission={perm}
              groupPermissions={groupPermissions}
              onChange={onChange}
            />
          </li>
        ))}
    </ul>
  );
};
