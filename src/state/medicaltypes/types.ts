import { MedicalTypeDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IMedicalTypesState = {
  createMedicalType: IApiResponse<null>;
  editMedicalType: IApiResponse<null>;
  deleteMedicalType: IApiResponse<null>;
  getMedicalType: IApiResponse<MedicalTypeDTO[]>;
};
