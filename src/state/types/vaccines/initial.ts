import { ApiResponse } from "../../types";
import { IVaccineTypesState } from "./types";

export const initial: IVaccineTypesState = {
  getVaccineTypes: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
