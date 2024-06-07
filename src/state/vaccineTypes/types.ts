import { VaccineTypeDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IVaccineTypesState = {
  getVaccineTypes: ApiResponse<Array<VaccineTypeDTO>>;
  create: ApiResponse<VaccineTypeDTO>;
  update: ApiResponse<VaccineTypeDTO>;
  delete: ApiResponse<boolean>;
};
