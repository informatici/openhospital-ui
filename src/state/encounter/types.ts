import {
  AdmissionDTO,
  EncounterDTO,
  OpdWithOperationRowDTO,
  PatientExaminationDTO,
} from "../../generated";
import { ApiResponse } from "../types";

export type IEncountersState = {
  selectedPatientEncounter?: EncounterDTO;
  createEncounter: ApiResponse<EncounterDTO>;
  updateEncounter: ApiResponse<EncounterDTO>;
  getCurrentEncounterByPatient: ApiResponse<EncounterDTO>;
  getEncountersByPatient: ApiResponse<Array<EncounterDTO>>;
  encounterAdmissions: ApiResponse<Array<AdmissionDTO>>;
  encounterExamninations: ApiResponse<Array<PatientExaminationDTO>>;
  encounterOpds: ApiResponse<Array<OpdWithOperationRowDTO>>;
};
