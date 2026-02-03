import { IOpdState } from "./types";
import { ApiResponse } from "../types";

export const initial: IOpdState = {
  createOpd: new ApiResponse({ status: "IDLE" }),
  updateOpd: new ApiResponse({ status: "IDLE" }),
  getOpds: new ApiResponse({ status: "IDLE", data: [] }),
  lastOpd: new ApiResponse({ status: "IDLE" }),
  searchOpds: new ApiResponse({ status: "IDLE" }),
  deleteOpd: new ApiResponse({ status: "IDLE" }),
};
