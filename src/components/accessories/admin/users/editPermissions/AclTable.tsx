import React, { useMemo } from "react";

import { PermissionDTO } from "../../../../../generated";
import { AclPermissionCheckbox } from "./AclPermissionCheckbox";
import classes from "./AclTable.module.scss";
import {
  Crud,
  PermissionActionEnum,
  permissionsToCrud,
} from "./permission.utils";

interface IProps {
  permissions: PermissionDTO[];
  groupPermissions: PermissionDTO[];
  onChange: (permission: PermissionDTO, action: PermissionActionEnum) => void;
}

export const AclTable = ({
  permissions,
  groupPermissions,
  onChange,
}: IProps) => {
  const crudPermissions = useMemo(() => {
    return permissionsToCrud(permissions);
  }, [permissions]);

  const crudKeys = Array.from(crudPermissions.keys());

  return (
    <table className={classes.acl}>
      <thead>
        <tr>
          <th>name</th>
          <th>create</th>
          <th>read</th>
          <th>update</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(crudPermissions.values()).map((crudPermission, index) => {
          return (
            <tr key={index}>
              <td>{crudKeys[index]}</td>
              {[Crud.CREATE, Crud.READ, Crud.UPDATE, Crud.DELETE].map(
                (access: Crud, index: number) => {
                  return crudPermission[access] ? (
                    <td key={index}>
                      <AclPermissionCheckbox
                        permission={crudPermission[access]}
                        onChange={onChange}
                        groupPermissions={groupPermissions}
                      />
                    </td>
                  ) : (
                    <td key={index} className={classes.empty}>
                      <span>∅</span>
                    </td>
                  );
                }
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
