import { AgeTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IAgeTypesState = {
  getAll: ApiResponse<Array<AgeTypeDTO>>;
  update: ApiResponse<Array<AgeTypeDTO>>;
};
