import {
  AdmissionDTO,
  AdmittedPatientDTO,
  PageAdmissionDTO,
} from "../../generated";
import { IApiResponse } from "../types";

export type IAdmissionsState = {
  createAdmission: IApiResponse<AdmissionDTO>;
  updateAdmission: IApiResponse<AdmissionDTO>;
  getAdmissions: IApiResponse<PageAdmissionDTO>;
  getDischarges: IApiResponse<PageAdmissionDTO>;
  getPatientAdmissions: IApiResponse<Array<AdmissionDTO>>;
  getAdmittedPatients: IApiResponse<Array<AdmittedPatientDTO>>;
  currentAdmissionByPatientId: IApiResponse<AdmissionDTO>;
  dischargePatient: IApiResponse<AdmissionDTO>;
};
