import { UserDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IUserState = {
  userList: ApiResponse<Array<UserDTO>>;
  create: ApiResponse<UserDTO>;
  update: ApiResponse<UserDTO>;
  delete: ApiResponse<void>;
};
