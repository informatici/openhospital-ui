import { ApiResponse } from "../../types";
import { IOperationTypesState } from "./types";

export const initial: IOperationTypesState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
