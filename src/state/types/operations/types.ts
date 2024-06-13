import { OperationTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IOperationTypesState = {
  getAll: ApiResponse<Array<OperationTypeDTO>>;
  create: ApiResponse<OperationTypeDTO>;
  update: ApiResponse<OperationTypeDTO>;
  delete: ApiResponse<boolean>;
};
