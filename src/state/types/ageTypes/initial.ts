import { ApiResponse } from "../../types";
import { IAgeTypesState } from "./types";

export const initial: IAgeTypesState = {
  getAll: new ApiResponse({ status: "IDLE", data: [] }),
  update: new ApiResponse({ status: "IDLE", data: [] }),
};
