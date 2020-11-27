import { PatientDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IPatientsState = {
  createPatient: IApiResponse<null>;
  searchResults: IApiResponse<Array<PatientDTO>>;
  selectedPatient: IApiResponse<PatientDTO>;
  updatePatient: IApiResponse<null>;
};
