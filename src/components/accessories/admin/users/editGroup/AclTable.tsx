import React, { useMemo } from "react";

import { PermissionDTO } from "../../../../../generated";
import { AclPermissionCheckbox } from "./AclPermissionCheckbox";
import classes from "./AclTable.module.scss";

interface IProps {
  permissions: PermissionDTO[];
  userGroupId: string;
}

enum Crud {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

export const groupPermissions = (
  permissions: PermissionDTO[]
): Map<string, Record<Crud, PermissionDTO>> => {
  let permissionNames = new Map();
  for (let i = 0; i < permissions.length; i++) {
    const matches =
      permissions[i].name &&
      /([a-z]+)\.(create|read|update|delete)$/.exec(permissions[i].name || "");
    // no match: skip
    if (!matches) continue;
    const [, key, access] = matches;

    if (!!permissionNames.get(key)?.[access]) {
      throw new Error(`duplicate permission ${key}.${access}`);
    }

    permissionNames.set(key, {
      ...permissionNames.get(key),
      [access]: permissions[i],
    });
  }
  return permissionNames;
};

export const AclTable = ({ permissions, userGroupId }: IProps) => {
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
                        onChange={() => console.log}
                        thisGroup={userGroupId}
                      />
                    </td>
                  ) : (
                    <td className={classes.empty}>
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
