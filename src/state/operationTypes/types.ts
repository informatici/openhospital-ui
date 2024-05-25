import { OperationTypeDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOperationTypeState = {
  getOperationTypes: IApiResponse<Array<OperationTypeDTO>>;
};
