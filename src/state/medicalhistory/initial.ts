import { ApiResponse } from "../types";
import { IMedicalHistoryState } from "./types";

export const initial: IMedicalHistoryState = {
  createMedicalHistory: new ApiResponse({ status: "IDLE" }),
  updateMedicalHistory: new ApiResponse({ status: "IDLE" }),
  getMedicalHistoryById: new ApiResponse({ status: "IDLE" }),
  getMedicalHistoryByPatientCode: new ApiResponse({ status: "IDLE", data: [] }),
};
