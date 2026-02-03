import { ApiResponse } from "../../types";
import { IDischargeTypesState } from "./types";

export const initial: IDischargeTypesState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
