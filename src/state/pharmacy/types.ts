import {
  MedicalDTO,
  MedicalTypeDTO,
  MedicalWardDTO,
  MovementDTO,
  MovementTypeDTO,
  MovementWardDTO,
  WardDTO,
} from "generated";
import { ApiResponse } from "state/types";

export type IPharmacyState = {
  wardMovements: ApiResponse<MovementWardDTO[]>;
  wardMedicals: ApiResponse<MedicalWardDTO[]>;
  getMovements: ApiResponse<Array<MovementDTO>>;
  movementTypes: ApiResponse<Array<MovementTypeDTO>>;
  createMovement: ApiResponse<MovementDTO>;
  updateMovement: ApiResponse<MovementDTO>;
  deleteMovement: ApiResponse<void>;
  getMedicals: ApiResponse<Array<MedicalDTO>>;
  getMedical: ApiResponse<MedicalDTO>;
  newMedical: ApiResponse<MedicalDTO>;
  updateMedical: ApiResponse<MedicalDTO>;
  getMedicalTypes: ApiResponse<Array<MedicalTypeDTO>>;
  chargeMovements: ApiResponse<boolean>;
  dischargeMovements: ApiResponse<boolean>;
  newMovementWard: ApiResponse<boolean>;
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
