import { OperationDTO, OperationRowDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IOperationState = {
  operationList: ApiResponse<Array<OperationDTO>>;
  createOperationRow: ApiResponse<OperationRowDTO>;
  updateOperationRow: ApiResponse<OperationRowDTO>;
  deleteOperationRow: ApiResponse<OperationRowDTO>;
  operationRowsByQdmt: ApiResponse<Array<OperationRowDTO>>;
  create: ApiResponse<OperationDTO>;
  update: ApiResponse<OperationDTO>;
  delete: ApiResponse<boolean>;
};
