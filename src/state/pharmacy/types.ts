import { MovementDTO, MovementWardDTO, WardDTO, MedicalDTO} from "generated";
import { ApiResponse } from "state/types";

export type IPharmacyState = {
  wardMovements: ApiResponse<MovementWardDTO[]>;
  getMovements: ApiResponse<Array<MovementDTO>>;
  createMovement: ApiResponse<MovementDTO>;
  updateMovement: ApiResponse<MovementDTO>;
  deleteMovement: ApiResponse<void>;
  getMedicals: ApiResponse<Array<MedicalDTO>>;
  getMedicalsMov: ApiResponse<Array<MedicalDTO>>;
  wardStock: {
    filter: TWardStockFIlter;
  };
};

export type TWardStockFIlter = {
  ward?: WardDTO;
  type?: "outcoming" | "incoming";
  drugs?: boolean;
    getMovements: ApiResponse<Array<MovementDTO>>;
    createMovement: ApiResponse<MovementDTO>;
    updateMovement: ApiResponse<MovementDTO>;
    deleteMovement: ApiResponse<void>;
    getMedicals: ApiResponse<Array<MedicalDTO>>;
    getMedicalsMov: ApiResponse<Array<MedicalDTO>>;
};
