import { LaboratoryDTO, TherapyRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type ILaboratoriesState = {
  createLab: IApiResponse<null>;
  updateLab: IApiResponse<null>;
  deleteLab: IApiResponse<null>;
  materials: IApiResponse<Array<string>>;
  labsByPatientId: IApiResponse<Array<LaboratoryDTO>>;
};
