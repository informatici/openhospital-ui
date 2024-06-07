import { AgeTypeDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IAgeTypeState = {
  getAllAgeTypes: ApiResponse<Array<AgeTypeDTO>>;
};
