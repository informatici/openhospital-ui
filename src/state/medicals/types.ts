import { MedicalDTO, VisitDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IMedicalsState = {
  newMedical: IApiResponse<null>;
  getMedicals: IApiResponse<Array<MedicalDTO>>;
  selectedMedical: IApiResponse<MedicalDTO>;
  editMedical: IApiResponse<null>;
  deleteMedical: IApiResponse<null>;
};
