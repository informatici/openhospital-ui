import { ApiResponse } from "../types";
import { IEncountersState } from "./types";

export const initial: IEncountersState = {
  selectedPatientEncounter: undefined,
  createEncounter: new ApiResponse({ status: "IDLE" }),
  updateEncounter: new ApiResponse({ status: "IDLE" }),
  getCurrentEncounterByPatient: new ApiResponse({ status: "IDLE" }),
  getEncountersByPatient: new ApiResponse({ status: "IDLE", data: [] }),
  encounterAdmissions: new ApiResponse({ status: "IDLE", data: [] }),
  encounterLaboratoryExams: new ApiResponse({ status: "IDLE", data: [] }),
  encounterExamRequests: new ApiResponse({ status: "IDLE", data: [] }),
  encounterExamninations: new ApiResponse({ status: "IDLE", data: [] }),
  encounterConditionings: new ApiResponse({ status: "IDLE", data: [] }),
  encounterOpds: new ApiResponse({ status: "IDLE", data: [] }),
};
