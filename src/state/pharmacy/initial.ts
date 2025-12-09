import { ApiResponse } from "state/types";
import { IPharmacyState } from "./types";

export const initial: IPharmacyState = {
  wardMovements: new ApiResponse({ status: "IDLE", data: [] }),
  wardMedicals: new ApiResponse({ status: "IDLE", data: [] }),
  movementTypes: new ApiResponse({ status: "IDLE", data: [] }),
  getMovements: new ApiResponse({ status: "IDLE", data: [] }),
  createMovement: new ApiResponse({ status: "IDLE" }),
  updateMovement: new ApiResponse({ status: "IDLE" }),
  deleteMovement: new ApiResponse({ status: "IDLE" }),
  chargeMovements: new ApiResponse({ status: "IDLE" }),
  dischargeMovements: new ApiResponse({ status: "IDLE" }),
  getMedicals: new ApiResponse({ status: "IDLE", data: [] }),
  getMedical: new ApiResponse({ status: "IDLE" }),
  newMedical: new ApiResponse({ status: "IDLE" }),
  updateMedical: new ApiResponse({ status: "IDLE" }),
  getMedicalTypes: new ApiResponse({ status: "IDLE", data: [] }),
  newMovementWard: new ApiResponse({ status: "IDLE" }),
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
      getMedicalsMov: new ApiResponse({ status: "IDLE", data: [] }),
    },
  },
};
