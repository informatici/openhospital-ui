import { AdmissionDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IAdmissionsState = {
  createAdmission: IApiResponse<AdmissionDTO>;
  admissionsByPatientId: IApiResponse<Array<AdmissionDTO>>;
  currentAdmissionByPatientId: IApiResponse<AdmissionDTO>;
};
