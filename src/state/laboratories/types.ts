import { LaboratoryDTO, LaboratoryForPrintDTO } from "../../generated";
import { IApiResponse } from "../types";

export type ILaboratoriesState = {
  createLab: IApiResponse<null>;
  updateLab: IApiResponse<null>;
  deleteLab: IApiResponse<null>;
  materials: IApiResponse<Array<string>>;
  labsByPatientId: IApiResponse<Array<LaboratoryDTO>>;
  getLabByCode: IApiResponse<LaboratoryDTO | null>;
  searchLabs: IApiResponse<Array<LaboratoryForPrintDTO>>;
};
