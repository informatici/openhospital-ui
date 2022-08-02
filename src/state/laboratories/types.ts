import {
  LaboratoryDTO,
  LaboratoryForPrintDTO,
  LabWithRowsDTO,
} from "../../generated";
import { IApiResponse } from "../types";

export type ILaboratoriesState = {
  createLab: IApiResponse<null>;
  updateLab: IApiResponse<null>;
  deleteLab: IApiResponse<null>;
  materials: IApiResponse<Array<string>>;
  labsByPatientId: IApiResponse<Array<LaboratoryDTO>>;
  getLabByCode: IApiResponse<LaboratoryDTO | null>;
  getLabWithRowsByCode: IApiResponse<LabWithRowsDTO | null>;
  searchLabs: IApiResponse<Array<LaboratoryForPrintDTO>>;
};
