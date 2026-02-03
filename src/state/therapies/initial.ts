import { ITherapiesState } from "./types";
import { ApiResponse } from "../types";

export const initial: ITherapiesState = {
  createTherapy: new ApiResponse({ status: "IDLE" }),
  updateTherapy: new ApiResponse({ status: "IDLE" }),
  therapiesByPatientId: new ApiResponse({ status: "IDLE", data: [] }),
  deleteTherapy: new ApiResponse({ status: "IDLE" }),
};
