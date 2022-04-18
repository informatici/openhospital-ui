import { OperationDTO, OperationRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOperationState = {
  operationList: IApiResponse<Array<OperationDTO>>;
  createOperationRow: IApiResponse<null>;
  updateOperationRow: IApiResponse<null>;
  deleteOperationRow: IApiResponse<null>;
  operationRowsByQdmt: IApiResponse<Array<OperationRowDTO>>;
};
