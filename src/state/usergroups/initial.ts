import { UserGroupDTO } from "../../generated";
import { IUserGroupState } from "./types";
import { ApiResponse } from "../types";

export const initial: IUserGroupState = {
  groupList: new ApiResponse({
    status: "IDLE",
    data: new Array<UserGroupDTO>(),
  }),
  currentGroup: new ApiResponse({
    status: "IDLE",
    data: {} as UserGroupDTO,
  }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
  setPermission: new ApiResponse({ status: "IDLE" }),
};
