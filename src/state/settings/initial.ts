import { ApiResponse } from "state/types";
import { ISettingsState } from "./types";

export const initial: ISettingsState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  getByCode: new ApiResponse({ status: "IDLE" }),
  getById: new ApiResponse({ status: "IDLE" }),
  resetAll: new ApiResponse({ status: "IDLE" }),
  update: new ApiResponse({ status: "IDLE" }),
};
