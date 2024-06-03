import { WardDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IWardState = {
  allWards: ApiResponse<Array<WardDTO>>;
  create: ApiResponse<WardDTO>;
  update: ApiResponse<WardDTO>;
  delete: ApiResponse<boolean>;
};
