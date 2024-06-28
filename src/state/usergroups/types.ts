import { UserGroupDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IUserGroupState = {
  groupList: ApiResponse<Array<UserGroupDTO>>;
  create: ApiResponse<UserGroupDTO>;
};