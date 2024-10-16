import React from "react";

import { PermissionDTO } from "../../../../../generated";
import { AclTable } from "./AclTable";
import { AreaAccess } from "./AreaAccess";
import { PermissionActionEnum, PermissionActionType } from "./permission.utils";

interface IProps {
  permissions: PermissionDTO[];
  groupPermissions: PermissionDTO[];
  setDirty: (v: boolean) => void;
  update: (pa: PermissionActionType) => void;
}
export const GroupPermissionsEditor = ({
  permissions,
  groupPermissions,
  setDirty,
  update,
}: IProps) => {
  const handleChange = (
    newPermission: PermissionDTO,
    action: PermissionActionEnum
  ) => {
    setDirty(true);
    update({ permission: newPermission, action });
  };

  return (
    <>
      <h2>Areas access</h2>
      <AreaAccess
        permissions={permissions}
        groupPermissions={groupPermissions}
        onChange={handleChange}
      />
      <h2>Access-control list</h2>
      <AclTable
        permissions={permissions}
        groupPermissions={groupPermissions}
        onChange={handleChange}
      />
    </>
  );
};
