import { PatientExaminationDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IExaminationsState = {
  createExamination: IApiResponse<null>;
  examinationsByPatientId: IApiResponse<Array<PatientExaminationDTO>>;
};
