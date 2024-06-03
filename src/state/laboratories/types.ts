import {
  LaboratoryDTO,
  LabWithRowsDTO,
  PageLabWithRowsDTO,
} from "../../generated";
import { ApiResponse } from "../types";

export type ILaboratoriesState = {
  createLab: ApiResponse<LabWithRowsDTO>;
  createLabRequest: ApiResponse<LaboratoryDTO>;
  updateLab: ApiResponse<LabWithRowsDTO>;
  deleteLab: ApiResponse<LaboratoryDTO>;
  cancelLab: ApiResponse<LaboratoryDTO>;
  materials: ApiResponse<Array<string>>;
  labsByPatientId: ApiResponse<Array<LabWithRowsDTO>>;
  labsRequestByPatientId: ApiResponse<Array<LaboratoryDTO>>;
  getLabByCode: ApiResponse<LaboratoryDTO | null>;
  getLabWithRowsByCode: ApiResponse<LabWithRowsDTO | null>;
  searchLabs: ApiResponse<PageLabWithRowsDTO | null>;
};
