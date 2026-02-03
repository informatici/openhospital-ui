import { ApiResponse } from "../../types";
import { IMedicalTypesState } from "./types";

export const initial: IMedicalTypesState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
