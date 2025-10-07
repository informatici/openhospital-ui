import { MedicalDTO, MovementDTO } from "generated";
import { ApiResponse } from "state/types";

export type IPharmacyState = {
    getMovements: ApiResponse<Array<MovementDTO>>;
    createMovement: ApiResponse<MovementDTO>;
    updateMovement: ApiResponse<MovementDTO>;
    deleteMovement: ApiResponse<void>;
    getMedicals: ApiResponse<Array<MedicalDTO>>;
    getMedicalsMov: ApiResponse<Array<MedicalDTO>>;
};
