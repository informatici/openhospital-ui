import { PermissionDTO } from "../../generated";
import permissionList from "./permissionList";
import { userGroupsDTO } from "./userGroupsDTO";

export const permissionDTO: PermissionDTO[] = Array.from(permissionList).map(
  (permissionName, i) => ({
    name: permissionName,
    id: i,
    description: "",
    userGroupIds: [
      userGroupsDTO[0].code, //admin
      userGroupsDTO[(i + 1) % (userGroupsDTO.length - 1)].code, //others
    ],
  })
);
