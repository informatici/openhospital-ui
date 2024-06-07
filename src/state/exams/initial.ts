import { IExamState } from "./types";
import { ApiResponse } from "../types";

export const initial: IExamState = {
  examList: new ApiResponse({ status: "IDLE", data: [] }),
  examDelete: new ApiResponse({ status: "IDLE", data: false }),
  examCreate: new ApiResponse({ status: "IDLE" }),
  examRowsByExamCode: new ApiResponse({ status: "IDLE", data: [] }),
};
