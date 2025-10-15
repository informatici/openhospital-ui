import { ApiResponse } from "state/types";
import { IPharmacyState } from "./types";

export const initial: IPharmacyState = {
  wardMovements: new ApiResponse({ status: "IDLE", data: [] }),
  wardMedicals: new ApiResponse({ status: "IDLE", data: [] }),
  getMovements: new ApiResponse({ status: "IDLE", data: [] }),
  createMovement: new ApiResponse({ status: "IDLE" }),
  updateMovement: new ApiResponse({ status: "IDLE" }),
  deleteMovement: new ApiResponse({ status: "IDLE" }),
  wardStock: { filter: {} },
};
