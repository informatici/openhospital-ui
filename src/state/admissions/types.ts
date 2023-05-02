import { AdmissionDTO, AdmittedPatientDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IAdmissionsState = {
  createAdmission: IApiResponse<AdmissionDTO>;
  updateAdmission: IApiResponse<AdmissionDTO>;
  getAdmissions: IApiResponse<Array<AdmissionDTO>>;
  getDischarges: IApiResponse<Array<AdmissionDTO>>;
  getPatientAdmissions: IApiResponse<Array<AdmissionDTO>>;
  getAdmittedPatients: IApiResponse<Array<AdmittedPatientDTO>>;
  currentAdmissionByPatientId: IApiResponse<AdmissionDTO>;
  dischargePatient: IApiResponse<AdmissionDTO>;
};
