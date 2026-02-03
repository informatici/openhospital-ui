import { IAdmissionsState } from "./types";
import { ApiResponse } from "../types";

export const initial: IAdmissionsState = {
  createAdmission: new ApiResponse({ status: "IDLE" }),
  updateAdmission: new ApiResponse({ status: "IDLE" }),
  getAdmissions: new ApiResponse({ status: "IDLE" }),
  getPatientAdmissions: new ApiResponse({ status: "IDLE", data: [] }),
  getDischarges: new ApiResponse({ status: "IDLE" }),
  getAdmittedPatients: new ApiResponse({ status: "IDLE", data: [] }),
  currentAdmissionByPatientId: new ApiResponse({ status: "IDLE" }),
  dischargePatient: new ApiResponse({ status: "IDLE" }),
};
