import { OperationDTO, OperationRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOperationState = {
  operationList: IApiResponse<Array<OperationDTO>>;
  createOperationRow: IApiResponse<OperationRowDTO>;
  updateOperationRow: IApiResponse<OperationRowDTO>;
  deleteOperationRow: IApiResponse<OperationRowDTO>;
  operationRowsByQdmt: IApiResponse<Array<OperationRowDTO>>;
  create: IApiResponse<OperationDTO>;
  update: IApiResponse<OperationDTO>;
  delete: IApiResponse<boolean>;
};
