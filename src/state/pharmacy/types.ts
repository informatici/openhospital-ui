import {
  MedicalWardDTO,
  MovementDTO,
  MovementWardDTO,
  WardDTO,
  MedicalDTO
} from "generated";
import { ApiResponse } from "state/types";

export type IPharmacyState = {
  wardMovements: ApiResponse<MovementWardDTO[]>;
  wardMedicals: ApiResponse<MedicalWardDTO[]>;
  getMovements: ApiResponse<Array<MovementDTO>>;
  createMovement: ApiResponse<MovementDTO>;
  updateMovement: ApiResponse<MovementDTO>;
  deleteMovement: ApiResponse<void>;
  getMedicals: ApiResponse<Array<MedicalDTO>>;
  chargeMovements: ApiResponse<boolean>;
  wardStock: {
    filter: TWardStockFIlter;
  };
};

export type TWardStockFIlter = {
  ward?: WardDTO;
  type?: "outcoming" | "incoming" | "drugs";
  drugs?: boolean;
    getMovements: ApiResponse<Array<MovementDTO>>;
    createMovement: ApiResponse<MovementDTO>;
    updateMovement: ApiResponse<MovementDTO>;
    deleteMovement: ApiResponse<void>;
    getMedicals: ApiResponse<Array<MedicalDTO>>;
    getMedicalsMov: ApiResponse<Array<MedicalDTO>>;
};
