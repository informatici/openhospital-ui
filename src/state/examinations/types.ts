import { PatientExaminationDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IExaminationsState = {
  createExamination: ApiResponse<PatientExaminationDTO>;
  updateExamination: ApiResponse<PatientExaminationDTO>;
  getDefaultPatientExamination: ApiResponse<PatientExaminationDTO>;
  getLastByPatientId: ApiResponse<PatientExaminationDTO>;
  examinationsByPatientId: ApiResponse<Array<PatientExaminationDTO>>;
  deleteExamination: ApiResponse<null>;
};
