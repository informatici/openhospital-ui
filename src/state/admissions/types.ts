import { AdmissionDTO, TherapyRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IAdmissionsState = {
  createAdmission: IApiResponse<AdmissionDTO>;
  admissionsByPatientId: IApiResponse<Array<AdmissionDTO[]>>;
};
