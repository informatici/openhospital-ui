import { AdmissionDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IAdmissionsState = {
  createAdmission: IApiResponse<AdmissionDTO>;
  updateAdmission: IApiResponse<AdmissionDTO>;
  getAdmissions: IApiResponse<Array<AdmissionDTO>>;
  getOngoingAdmissions: IApiResponse<Array<AdmissionDTO>>;
  currentAdmissionByPatientId: IApiResponse<AdmissionDTO>;
  dischargePatient: IApiResponse<AdmissionDTO>;
};
