import { MedicalDTO, VisitDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IMedicalsState = {
  newMedical: IApiResponse<null>;
  editMedical: IApiResponse<null>;
  deleteMedical: IApiResponse<MedicalDTO>;
  searchMedical: IApiResponse<MedicalDTO[]>;
};
