import { AgeTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IAgeTypesState = {
  getAll: ApiResponse<Array<AgeTypeDTO>>;
  create: ApiResponse<AgeTypeDTO>;
  update: ApiResponse<AgeTypeDTO>;
  delete: ApiResponse<boolean>;
};
