import { IExamTypeState } from "./types";

export const initial: IExamTypeState = {
  getExamTypes: { status: "IDLE", data: [] },
};
