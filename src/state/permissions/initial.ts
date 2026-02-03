import { PermissionDTO } from "../../generated";
import { IPermissionsState } from "./types";
import { ApiResponse } from "../types";

export const initial: IPermissionsState = {
  getAll: new ApiResponse({
    status: "IDLE",
    data: new Array<PermissionDTO>(),
  }),
};
