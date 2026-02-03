import { MedicalTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IMedicalTypesState = {
  getAll: ApiResponse<Array<MedicalTypeDTO>>;
  create: ApiResponse<MedicalTypeDTO>;
  update: ApiResponse<MedicalTypeDTO>;
  delete: ApiResponse<boolean>;
};
