import { ApiResponse } from "../types";
import { IConditioningsState } from "./types";

export const initial: IConditioningsState = {
  newConditioning: new ApiResponse({ status: "IDLE" }),
  updateConditioning: new ApiResponse({ status: "IDLE" }),
  getConditioningByPatientCode: new ApiResponse({ status: "IDLE", data: [] }),
};
