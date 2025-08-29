import { ApiResponse } from "../types";
import { IEncountersState } from "./types";

export const initial: IEncountersState = {
  createEncounter: new ApiResponse({ status: "IDLE" }),
  updateEncounterStatus: new ApiResponse({ status: "IDLE" }),
  getCurrentEncounterByPatient: new ApiResponse({ status: "IDLE" }),
  updateEncounterCode: new ApiResponse({ status: "IDLE" }),
  getEncountersByPatient: new ApiResponse({ status: "IDLE", data: [] }),
};
