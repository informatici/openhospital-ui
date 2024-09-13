import { PermissionDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IPermissionsState = {
  getAll: ApiResponse<Array<PermissionDTO>>;
};
