import { ApiResponse } from "../../types";
import { IDiseaseTypesState } from "./types";

export const initial: IDiseaseTypesState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
