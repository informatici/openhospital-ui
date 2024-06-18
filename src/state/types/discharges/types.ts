import { DischargeTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IDischargeTypesState = {
  getAll: ApiResponse<Array<DischargeTypeDTO>>;
  create: ApiResponse<DischargeTypeDTO>;
  update: ApiResponse<DischargeTypeDTO>;
  delete: ApiResponse<boolean>;
};
