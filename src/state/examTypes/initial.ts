import { IExamTypeState } from "./types";
import { ApiResponse } from "../types";

export const initial: IExamTypeState = {
  getExamTypes: new ApiResponse({ status: "IDLE", data: [] }),
};
