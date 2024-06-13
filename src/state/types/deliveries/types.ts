import { DeliveryTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IDeliveryTypesState = {
  getAll: ApiResponse<Array<DeliveryTypeDTO>>;
  create: ApiResponse<DeliveryTypeDTO>;
  update: ApiResponse<DeliveryTypeDTO>;
  delete: ApiResponse<boolean>;
};
