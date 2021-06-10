import { MedicalDTO, VisitDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IMedicalState = {
  medicalsList: IApiResponse<Array<MedicalDTO>>;
};
