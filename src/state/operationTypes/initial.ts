import { IOperationTypeState } from "./types";

export const initial: IOperationTypeState = {
  getOperationTypes: { status: "IDLE", data: [] },
};
