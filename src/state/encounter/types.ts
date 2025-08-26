import { EncounterDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IEncountersState = {
  createEncounter: ApiResponse<EncounterDTO>;
  updateEncounterStatus: ApiResponse<EncounterDTO>;
  getCurrentEncounterByPatient: ApiResponse<EncounterDTO>;
  updateEncounterCode: ApiResponse<EncounterDTO>;
  getEncountersByPatient: ApiResponse<Array<EncounterDTO>>;
};
