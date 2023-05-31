import {
  LaboratoryDTO,
  LaboratoryForPrintDTO,
  LabWithRowsDTO,
} from "../../generated";
import { IApiResponse } from "../types";

export type ILaboratoriesState = {
  createLab: IApiResponse<LabWithRowsDTO>;
  createLabRequest: IApiResponse<LaboratoryDTO>;
  updateLab: IApiResponse<LabWithRowsDTO>;
  deleteLab: IApiResponse<LaboratoryDTO>;
  cancelLab: IApiResponse<LaboratoryDTO>;
  materials: IApiResponse<Array<string>>;
  labsByPatientId: IApiResponse<Array<LabWithRowsDTO>>;
  labsRequestByPatientId: IApiResponse<Array<LaboratoryDTO>>;
  getLabByCode: IApiResponse<LaboratoryDTO | null>;
  getLabWithRowsByCode: IApiResponse<LabWithRowsDTO | null>;
  searchLabs: IApiResponse<Array<LabWithRowsDTO>>;
};
