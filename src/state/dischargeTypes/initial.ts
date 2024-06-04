import { IDischargeTypeState } from "./types";
import { ApiResponse } from "../types";

export const initial: IDischargeTypeState = {
  allDischargeTypes: new ApiResponse({ status: "IDLE", data: [] }),
};
