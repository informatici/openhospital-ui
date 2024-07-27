import React, { useMemo } from "react";

import { PermissionDTO } from "../../../../../generated";
import { AclPermissionCheckbox } from "./AclPermissionCheckbox";
import classes from "./AclTable.module.scss";
import { Crud, groupPermissions } from "./permission.utils";

interface IProps {
  permissions: PermissionDTO[];
  userGroupId: string;
  onChange: (permission: PermissionDTO) => void;
}

export const AclTable = ({ permissions, userGroupId, onChange }: IProps) => {
  const crudPermissions = useMemo(() => {
    return groupPermissions(permissions);
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
                        thisGroupId={userGroupId}
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
