import { ApiResponse } from "state/types";
import { IPharmacyState } from "./types";

export const initial: IPharmacyState = {
  wardMovements: new ApiResponse({ status: "IDLE", data: [] }),
  wardMedicals: new ApiResponse({ status: "IDLE", data: [] }),
  getMovements: new ApiResponse({ status: "IDLE", data: [] }),
  createMovement: new ApiResponse({ status: "IDLE" }),
  updateMovement: new ApiResponse({ status: "IDLE" }),
  deleteMovement: new ApiResponse({ status: "IDLE" }),
  chargeMovements: new ApiResponse({ status: "IDLE" }),
  getMedicals: new ApiResponse({ status: "IDLE", data: [] }),
  newMedical: new ApiResponse({ status: "IDLE" }),
  getMedicalTypes: new ApiResponse({ status: "IDLE", data: [] }),
  wardStock: {
    filter: {
      ward: undefined,
      type: undefined,
      drugs: undefined,
      getMovements: new ApiResponse({ status: "IDLE", data: [] }),
      createMovement: new ApiResponse({ status: "IDLE" }),
      updateMovement: new ApiResponse({ status: "IDLE" }),
      deleteMovement: new ApiResponse({ status: "IDLE" }),
      getMedicals: new ApiResponse({ status: "IDLE", data: [] }),
      getMedicalsMov: new ApiResponse({ status: "IDLE", data: [] })
    }
  }
};
