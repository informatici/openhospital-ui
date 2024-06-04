import { OperationTypeDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IOperationTypeState = {
  getOperationTypes: ApiResponse<Array<OperationTypeDTO>>;
};
