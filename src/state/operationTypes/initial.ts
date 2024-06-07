import { IOperationTypeState } from "./types";
import { ApiResponse } from "../types";

export const initial: IOperationTypeState = {
  getOperationTypes: new ApiResponse({ status: "IDLE", data: [] }),
};
