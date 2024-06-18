import { DeliveryResultTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IDeliveryResultTypeState = {
  getAll: ApiResponse<Array<DeliveryResultTypeDTO>>;
  create: ApiResponse<DeliveryResultTypeDTO>;
  update: ApiResponse<DeliveryResultTypeDTO>;
  delete: ApiResponse<boolean>;
};
