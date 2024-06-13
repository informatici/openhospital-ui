import { AdmissionTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IAdmissionTypesState = {
  getAll: ApiResponse<Array<AdmissionTypeDTO>>;
  create: ApiResponse<AdmissionTypeDTO>;
  update: ApiResponse<AdmissionTypeDTO>;
  delete: ApiResponse<boolean>;
};
