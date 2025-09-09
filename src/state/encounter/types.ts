import { EncounterDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IEncountersState = {
  createEncounter: ApiResponse<EncounterDTO>;
  updateEncounter: ApiResponse<EncounterDTO>;
  getCurrentEncounterByPatient: ApiResponse<EncounterDTO>;
  getEncountersByPatient: ApiResponse<Array<EncounterDTO>>;
};
