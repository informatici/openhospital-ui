import { PatientExaminationDTO, TherapyDTO } from "../../generated";
import { IApiResponse } from "../types";

export type ITherapiesState = {
  createTherapy: IApiResponse<null>;
  therapiesByPatientId: IApiResponse<Array<TherapyDTO>>;
};
