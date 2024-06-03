import { IExaminationsState } from "./types";
import { ApiResponse } from "../types";

export const initial: IExaminationsState = {
  createExamination: new ApiResponse({ status: "IDLE" }),
  updateExamination: new ApiResponse({ status: "IDLE" }),
  getDefaultPatientExamination: new ApiResponse({ status: "IDLE" }),
  getLastByPatientId: new ApiResponse({ status: "IDLE" }),
  examinationsByPatientId: new ApiResponse({ status: "IDLE", data: [] }),
  deleteExamination: new ApiResponse({ status: "IDLE" }),
};
