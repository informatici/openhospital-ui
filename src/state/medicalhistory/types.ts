import { MedicalHistoryDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IMedicalHistoryState = {
  createMedicalHistory: ApiResponse<MedicalHistoryDTO>;
  updateMedicalHistory: ApiResponse<MedicalHistoryDTO>;
  getMedicalHistoryById: ApiResponse<MedicalHistoryDTO>;
  getMedicalHistoryByPatientCode: ApiResponse<Array<MedicalHistoryDTO>>;
};
