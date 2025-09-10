import { AdmissionDTO, EncounterDTO, LaboratoryDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IEncountersState = {
  selectedPatientEncounter?: EncounterDTO;
  createEncounter: ApiResponse<EncounterDTO>;
  updateEncounterStatus: ApiResponse<EncounterDTO>;
  getCurrentEncounterByPatient: ApiResponse<EncounterDTO>;
  updateEncounterCode: ApiResponse<EncounterDTO>;
  getEncountersByPatient: ApiResponse<Array<EncounterDTO>>;
  encounterAdmissions: ApiResponse<Array<AdmissionDTO>>;
  encounterLaboratoryExams: ApiResponse<Array<LaboratoryDTO>>;
  encounterExamRequests: ApiResponse<Array<LaboratoryDTO>>;
};
