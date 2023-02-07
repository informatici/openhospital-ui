import {
  LaboratoryDTO,
  LaboratoryForPrintDTO,
  LabWithRowsDTO,
} from "../../generated";
import { IApiResponse } from "../types";

export type ILaboratoriesState = {
  createLab: IApiResponse<LabWithRowsDTO>;
  updateLab: IApiResponse<LabWithRowsDTO>;
  deleteLab: IApiResponse<LaboratoryDTO>;
  materials: IApiResponse<Array<string>>;
  labsByPatientId: IApiResponse<Array<LabWithRowsDTO>>;
  getLabByCode: IApiResponse<LaboratoryDTO | null>;
  getLabWithRowsByCode: IApiResponse<LabWithRowsDTO | null>;
  searchLabs: IApiResponse<Array<LabWithRowsDTO>>;
};
