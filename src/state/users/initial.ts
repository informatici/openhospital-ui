import { UserDTO } from "../../generated";
import { IUserState } from "./types";
import { ApiResponse } from "../types";

export const initial: IUserState = {
  userList: new ApiResponse({ status: "IDLE", data: new Array<UserDTO>() }),
  create: new ApiResponse({ status: "IDLE" }),
};
