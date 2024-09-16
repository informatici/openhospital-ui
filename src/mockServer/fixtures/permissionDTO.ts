import { PermissionDTO } from "../../generated";
import permissionList from "./permissionList";

export const permissionDTO: PermissionDTO[] = Array.from(permissionList).map(
  (permissionName, i) => ({
    name: permissionName,
    id: i,
    description: "",
  })
);
