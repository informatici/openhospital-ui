import { UserGroupDTO, PermissionDTO } from "../../generated";
import { permissionDTO } from "./permissionDTO";

export const userGroupsDTO: UserGroupDTO[] = [
  { code: "adm", desc: "admin", permissions: permissionDTO },
  {
    code: "con",
    desc: "contributor",
    permissions: permissionDTO.reduce(
      (acc: PermissionDTO[], curr, i) => (i % 5 === 0 ? [...acc, curr] : acc),
      []
    ),
  },
  {
    code: "guest",
    permissions: permissionDTO.reduce(
      (acc: PermissionDTO[], curr) =>
        // only permissions ending with "read"
        /read$/.test(curr.name ?? "") ? [...acc, curr] : acc,
      []
    ),
  },
  {
    code: "bot",
    permissions: permissionDTO.reduce(
      (acc: PermissionDTO[], curr) =>
        // only permissions ending with "update" or "delete"
        /(update|delete)$/.test(curr.name ?? "") ? [...acc, curr] : acc,
      []
    ),
  },
  {
    code: "labo",
    permissions: permissionDTO.reduce(
      (acc: PermissionDTO[], curr) =>
        // only examinations
        curr.name === "laboratories.access" ||
        /^examinations/.test(curr.name ?? "")
          ? [...acc, curr]
          : acc,
      []
    ),
  },
  { code: "doc" },
];
