import { UserDTO } from "../../generated";
import { ApiResponse } from "../types";
import { IUserState } from "./types";

export const initial: IUserState = {
  userList: new ApiResponse({ status: "IDLE", data: new Array<UserDTO>() }),
  getById: new ApiResponse({ status: "IDLE" }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
