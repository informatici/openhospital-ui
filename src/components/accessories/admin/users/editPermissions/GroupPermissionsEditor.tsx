import React, { useEffect, useState } from "react";

import { PermissionDTO } from "../../../../../generated";
import { AclTable } from "./AclTable";
import { AreaAccess } from "./AreaAccess";

interface IProps {
  permissions: PermissionDTO[];
  thisGroupId: string;
}
export const GroupPermissionsEditor = ({
  permissions,
  thisGroupId,
}: IProps) => {
  const [permissionsStack, setPermissionsStack] = useState<PermissionDTO[]>([]);
  const [permissionsState, setPermissionsState] = useState<PermissionDTO[]>([]);

  useEffect(() => {
    setPermissionsState(permissions);
  }, [permissions]);

  const handleChange = (newPermission: PermissionDTO) => {
    const otherPermissions = permissionsStack.filter(
      ({ id }) => id !== newPermission.id
    );
    setPermissionsStack([...otherPermissions, newPermission]);
    const newState = permissionsState.map((perm) =>
      perm.id === newPermission.id ? newPermission : perm
    );
    setPermissionsState(newState);
  };

  return (
    <>
      <h2>Areas access</h2>
      <AreaAccess
        permissions={permissionsState}
        thisGroupId={thisGroupId}
        onChange={handleChange}
      />

      <h2>Access-control list</h2>
      <AclTable
        permissions={permissionsState}
        userGroupId={thisGroupId}
        onChange={handleChange}
      />
      {permissionsStack.length && (
        <p>
          Editing permissions: {permissionsStack.map(({ id }) => id).join(",")}
        </p>
      )}
    </>
  );
};
