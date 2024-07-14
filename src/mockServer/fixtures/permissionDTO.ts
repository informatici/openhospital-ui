import { PermissionDTO } from "../../generated";
import permissionList from "./permissionList";
import { userGroupsDTO } from "./userGroupsDTO";

export const permissionDTO: PermissionDTO[] = Array.from(permissionList).map(
  (permissionName, i) => ({
    name: permissionName,
    id: i,
    description: "",
    userGroupIds: ["admin", userGroupsDTO[i % userGroupsDTO.length].code],
  })
);
