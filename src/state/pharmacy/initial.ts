import { ApiResponse } from "state/types";
import { IPharmacyState } from "./types";

export const initial: IPharmacyState = {
    getMovements: new ApiResponse({ status: "IDLE", data: [] }),
    createMovement: new ApiResponse({ status: "IDLE" }),
    updateMovement: new ApiResponse({ status: "IDLE" }),
    deleteMovement: new ApiResponse({ status: "IDLE" }),
    getMedicals: new ApiResponse({ status: "IDLE", data: [] }),
    getMedicalsMov: new ApiResponse({ status: "IDLE", data: [] }),
};