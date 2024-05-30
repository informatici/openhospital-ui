import { IAgeTypeState } from "./types";
import { ApiResponse } from "../types";

export const initial: IAgeTypeState = {
  getAllAgeTypes: new ApiResponse({ status: "IDLE", data: [] }),
};
