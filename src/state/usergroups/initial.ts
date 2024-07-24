import { UserGroupDTO } from "../../generated";
import { IUserGroupState } from "./types";
import { ApiResponse } from "../types";

export const initial: IUserGroupState = {
  groupList: new ApiResponse({
    status: "IDLE",
    data: new Array<UserGroupDTO>(),
  }),
  create: new ApiResponse({ status: "IDLE" }),
};
