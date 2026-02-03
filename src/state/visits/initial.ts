import { IVisitState } from "./types";
import { ApiResponse } from "../types";

export const initial: IVisitState = {
  getVisits: new ApiResponse({ status: "IDLE", data: [] }),
  createVisit: new ApiResponse({ status: "IDLE" }),
  updateVisit: new ApiResponse({ status: "IDLE" }),
  deleteVisit: new ApiResponse({ status: "IDLE" }),
};
