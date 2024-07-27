import React from "react";

import { PermissionDTO } from "../../../../../generated";
import { PermissionCheckbox } from "./PermissionCheckbox";

interface IProps {
  permissions: PermissionDTO[];
  thisGroupId: string;
  onChange: (permission: PermissionDTO) => void;
}
export const AreaAccess = ({ permissions, thisGroupId, onChange }: IProps) => {
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
              onChange={onChange}
              thisGroupId={thisGroupId}
            />
          </li>
        ))}
    </ul>
  );
};
