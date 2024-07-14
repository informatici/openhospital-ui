import React, { useMemo } from "react";

import { PermissionDTO } from "../../../../../generated";
import { PermissionCheckbox } from "./PermissionCheckbox";

interface IProps {
  permissions: PermissionDTO[];
  userGroupId: string;
}

type CrudAction = "create" | "read" | "update" | "delete";

export const groupPermissions = (
  permissions: PermissionDTO[]
): Map<string, Record<CrudAction, PermissionDTO>> => {
  let permissionNames = new Map();
  for (let i = 0; i < permissions.length; i++) {
    const matches =
      permissions[i].name &&
      /([a-z]+)\.(create|read|update|delete)$/.exec(permissions[i].name || "");
    // no match: skip
    if (!matches) continue;
    const [_, key, access] = matches;

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

export const CrudTable = ({ permissions, userGroupId }: IProps) => {
  const crudPermissions = useMemo(() => {
    return groupPermissions(permissions);
  }, [permissions]);

  const crudKeys = Array.from(crudPermissions.keys());

  return (
    <table style={{ border: "1px" }}>
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
              <td>
                {crudPermission.create && (
                  <PermissionCheckbox
                    permission={crudPermission.create}
                    onChange={() => console.log}
                    thisGroup={userGroupId}
                    popOver
                  />
                )}
              </td>
              <td>
                {crudPermission.read && (
                  <PermissionCheckbox
                    permission={crudPermission.read}
                    onChange={() => console.log}
                    thisGroup={userGroupId}
                    popOver
                  />
                )}
              </td>
              <td>
                {crudPermission.update && (
                  <PermissionCheckbox
                    permission={crudPermission.update}
                    onChange={() => console.log}
                    thisGroup={userGroupId}
                    popOver
                  />
                )}
              </td>
              <td>
                {crudPermission.delete && (
                  <PermissionCheckbox
                    permission={crudPermission.delete}
                    onChange={() => console.log}
                    thisGroup={userGroupId}
                    popOver
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
