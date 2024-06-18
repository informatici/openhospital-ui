import { VaccineDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IVaccineState = {
  vaccineList: ApiResponse<Array<VaccineDTO>>;
  create: ApiResponse<VaccineDTO>;
  update: ApiResponse<VaccineDTO>;
  delete: ApiResponse<boolean>;
};
