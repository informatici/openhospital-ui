import { ApiResponse } from "../../types";
import { IExamTypesState } from "./types";

export const initial: IExamTypesState = {
  getAllExamTypes: new ApiResponse({ status: "IDLE", data: [] }),
  create: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
  delete: new ApiResponse({ status: "IDLE" }),
};
