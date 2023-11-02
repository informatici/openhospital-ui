import { PatientExaminationDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IExaminationsState = {
  createExamination: IApiResponse<PatientExaminationDTO>;
  updateExamination: IApiResponse<PatientExaminationDTO>;
  getDefaultPatientExamination: IApiResponse<PatientExaminationDTO>;
  getLastByPatientId: IApiResponse<PatientExaminationDTO>;
  examinationsByPatientId: IApiResponse<Array<PatientExaminationDTO>>;
  deleteExamination: IApiResponse<null>;
};
