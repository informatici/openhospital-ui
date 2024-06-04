import { IDiseaseTypeState } from "./types";
import { ApiResponse } from "../types";

export const initial: IDiseaseTypeState = {
  getDiseaseTypes: new ApiResponse({ status: "IDLE", data: [] }),
};
