import {
  AdmissionDTO,
  ConditioningDTO,
  EncounterDTO,
  LaboratoryDTO,
  MedicalHistoryDTO,
  OpdWithOperationRowDTO,
  PatientExaminationDTO,
} from "generated";
import { ApiResponse } from "../types";

export type IEncountersState = {
  selectedPatientEncounter?: EncounterDTO;
  createEncounter: ApiResponse<EncounterDTO>;
  updateEncounter: ApiResponse<EncounterDTO>;
  getCurrentEncounterByPatient: ApiResponse<EncounterDTO>;
  getEncountersByPatient: ApiResponse<Array<EncounterDTO>>;
  encounterAdmissions: ApiResponse<Array<AdmissionDTO>>;
  encounterLaboratoryExams: ApiResponse<Array<LaboratoryDTO>>;
  encounterExamRequests: ApiResponse<Array<LaboratoryDTO>>;
  encounterExamninations: ApiResponse<Array<PatientExaminationDTO>>;
  encounterConditionings: ApiResponse<Array<ConditioningDTO>>;
  encounterOpds: ApiResponse<Array<OpdWithOperationRowDTO>>;
  encounterMedicalHistories: ApiResponse<Array<MedicalHistoryDTO>>;
  printEncounter: ApiResponse<Blob>;
};
