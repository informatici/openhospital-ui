import { MovementDTO, MovementWardDTO, WardDTO } from "generated";
import { ApiResponse } from "state/types";

export type IPharmacyState = {
  wardMovements: ApiResponse<MovementWardDTO[]>;
  getMovements: ApiResponse<Array<MovementDTO>>;
  createMovement: ApiResponse<MovementDTO>;
  updateMovement: ApiResponse<MovementDTO>;
  deleteMovement: ApiResponse<void>;
  wardStock: {
    filter: TWardStockFIlter;
  };
};

export type TWardStockFIlter = {
  ward?: WardDTO;
  type?: "outcoming" | "incoming";
  drugs?: boolean;
};
