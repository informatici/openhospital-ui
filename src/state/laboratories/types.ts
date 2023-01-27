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
  labsByPatientId: IApiResponse<Array<LabWithRowsDTO>>;
  getLabByCode: IApiResponse<LaboratoryDTO | null>;
  getLabWithRowsByCode: IApiResponse<LabWithRowsDTO | null>;
  searchLabs: IApiResponse<Array<LaboratoryForPrintWithRows>>;
};

export type LaboratoryForPrintWithRows = {
  laboratoryForPrintDTO: LaboratoryForPrintDTO;
  laboratoryRowList: Array<String>;
};
