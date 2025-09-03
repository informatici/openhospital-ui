import { ConditioningDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IConditioningsState = {
  newConditioning: ApiResponse<ConditioningDTO>;
  updateConditioning: ApiResponse<ConditioningDTO>;
  getConditioningByPatientCode: ApiResponse<Array<ConditioningDTO>>;
};
