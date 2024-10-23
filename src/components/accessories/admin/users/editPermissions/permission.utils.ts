import { PermissionDTO } from "../../../../../generated";

export enum PermissionActionEnum {
  ASSIGN = "assign",
  REVOKE = "revoke",
}

export type PermissionActionType = {
  action: PermissionActionEnum;
  permission: PermissionDTO;
};

export enum Crud {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

/**
 * fomats permission in the CRUD format
 * @param permissions
 * @returns Map<string, Record<Crud, PermissionDTO>>
 * @example
 * permissionsToCrud([
 * { id: "1", name: "users.create" },
 * { id: "2", name: "users.read" },-
 * ]) => Map(2) {
 * "users" => { create: { id: "1", name: "users.create" },
 *            { read: { id: "2", name: "users.read" }
 *
 */
export const permissionsToCrud = (
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

export const comparePermissions = (
  allPermissions: PermissionDTO[],
  initialPermissions: PermissionDTO[],
  stackedPermissions: PermissionDTO[]
): Array<PermissionActionType> => {
  let changedPermissions: Array<PermissionActionType> = [];
  for (const permission of allPermissions) {
    const initialPermission = initialPermissions.find(
      ({ id }) => permission.id === id
    );
    const stackedPermission = stackedPermissions.find(
      ({ id }) => permission.id === id
    );

    if (!!initialPermission && !!stackedPermission) {
      continue;
    }

    if (initialPermission !== stackedPermission) {
      changedPermissions = [
        ...changedPermissions,
        {
          action: stackedPermission
            ? PermissionActionEnum.ASSIGN
            : PermissionActionEnum.REVOKE,
          permission,
        },
      ];
    }
  }
  return changedPermissions;
};
