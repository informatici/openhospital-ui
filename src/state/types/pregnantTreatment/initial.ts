import { ApiResponse } from "../../types";
import { IPregnantTreatmentTypesState } from "./types";

export const initial: IPregnantTreatmentTypesState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
