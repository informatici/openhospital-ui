import { PermissionDTO } from "../../../../../generated";

export enum Crud {
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

export const computeNewPermission = (
  thisGroupId: string,
  permission: PermissionDTO,
  val: boolean
): PermissionDTO => {
  const getUserGroups = () => {
    if (val) {
      if (permission.userGroupIds.includes(thisGroupId))
        return permission.userGroupIds;
      return [...permission.userGroupIds, thisGroupId];
    }
    let userGroupIds: string[] = [];
    for (let index = 0; index < permission.userGroupIds.length; index++) {
      if (permission.userGroupIds[index] !== thisGroupId)
        userGroupIds = [...userGroupIds, permission.userGroupIds[index]];
    }
    return userGroupIds;
  };

  return {
    ...permission,
    userGroupIds: getUserGroups(),
  };
};
