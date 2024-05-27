import { OperationDTO, OperationRowDTO } from "../../generated";
import { IOperationState } from "./types";

export const initial: IOperationState = {
  operationList: { status: "IDLE", data: new Array<OperationDTO>() },
  createOperationRow: { status: "IDLE" },
  updateOperationRow: { status: "IDLE" },
  deleteOperationRow: { status: "IDLE" },
  operationRowsByQdmt: { status: "IDLE", data: new Array<OperationRowDTO>() },
  create: { status: "IDLE" },
  update: { status: "IDLE" },
  delete: { status: "IDLE" },
};
