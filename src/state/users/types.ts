import { UserDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IUserState = {
  userList: IApiResponse<Array<UserDTO>>;
};
