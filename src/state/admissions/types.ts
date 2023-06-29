import {
  AdmissionDTO,
  AdmittedPatientDTO,
  PageOfAdmissionDTO,
} from "../../generated";
import { IApiResponse } from "../types";

export type IAdmissionsState = {
  createAdmission: IApiResponse<AdmissionDTO>;
  updateAdmission: IApiResponse<AdmissionDTO>;
  getAdmissions: IApiResponse<PageOfAdmissionDTO>;
  getDischarges: IApiResponse<PageOfAdmissionDTO>;
  getPatientAdmissions: IApiResponse<Array<AdmissionDTO>>;
  getAdmittedPatients: IApiResponse<Array<AdmittedPatientDTO>>;
  currentAdmissionByPatientId: IApiResponse<AdmissionDTO>;
  dischargePatient: IApiResponse<AdmissionDTO>;
};
