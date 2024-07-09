import { ApiResponse } from "../types";
import { IVaccineState } from "./types";

export const initial: IVaccineState = {
  vaccineList: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
