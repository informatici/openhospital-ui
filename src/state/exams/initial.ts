import { IExamState } from "./types";
import { ApiResponse } from "../types";

export const initial: IExamState = {
  examList: new ApiResponse({ status: "IDLE", data: [] }),
  examRowsByExamCode: new ApiResponse({ status: "IDLE", data: [] }),
};
