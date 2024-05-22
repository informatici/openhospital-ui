import { UserDTO } from "../../generated";
import { IUserState } from "./types";

export const initial: IUserState = {
  userList: { status: "IDLE", data: new Array<UserDTO>() },
};
