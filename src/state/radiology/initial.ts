import { ApiResponse } from "../types";
import { IRadiologyState } from "./types";

export const initial: IRadiologyState = {
  studies: new ApiResponse({ status: "IDLE", data: [] }),
  series: new ApiResponse({ status: "IDLE", data: [] }),
  seriesWithInstances: new ApiResponse({ status: "IDLE", data: [] }),
  instances: new ApiResponse({ status: "IDLE", data: [] }),
  preview: new ApiResponse({ status: "IDLE" }),
};
