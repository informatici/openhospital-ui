import { DischargeTypeDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IDischargeTypeState = {
  allDischargeTypes: ApiResponse<Array<DischargeTypeDTO>>;
};
