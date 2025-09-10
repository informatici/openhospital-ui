import {
  AdmissionDTO,
  EncounterDTO,
  OpdWithOperationRowDTO,
} from "../../generated";
import { ApiResponse } from "../types";

export type IEncountersState = {
  selectedPatientEncounter?: EncounterDTO;
  createEncounter: ApiResponse<EncounterDTO>;
  updateEncounterStatus: ApiResponse<EncounterDTO>;
  getCurrentEncounterByPatient: ApiResponse<EncounterDTO>;
  updateEncounterCode: ApiResponse<EncounterDTO>;
  getEncountersByPatient: ApiResponse<Array<EncounterDTO>>;
  encounterAdmissions: ApiResponse<Array<AdmissionDTO>>;
  encounterOpds: ApiResponse<Array<OpdWithOperationRowDTO>>;
};
