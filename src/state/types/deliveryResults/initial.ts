import { ApiResponse } from "../../types";
import { IDeliveryResultTypeState } from "./types";

export const initial: IDeliveryResultTypeState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
