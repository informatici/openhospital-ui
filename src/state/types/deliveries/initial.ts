import { ApiResponse } from "../../types";
import { IDeliveryTypesState } from "./types";

export const initial: IDeliveryTypesState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
