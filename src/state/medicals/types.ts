import { MedicalDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IMedicalsState = {
  newMedical: IApiResponse<null>;
  getMedicals: IApiResponse<Array<MedicalDTO>>;
  filterMedicals: IApiResponse<Array<MedicalDTO>>;
  selectedMedical: IApiResponse<MedicalDTO>;
  editMedical: IApiResponse<null>;
  deleteMedical: IApiResponse<null>;
};
