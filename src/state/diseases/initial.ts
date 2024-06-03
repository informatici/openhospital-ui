import { IDiseaseState } from "./types";
import { ApiResponse } from "../types";

export const initial: IDiseaseState = {
  allDiseases: new ApiResponse({ status: "IDLE", data: [] }),
  diseasesOpd: new ApiResponse({ status: "IDLE", data: [] }),
  diseasesIpdIn: new ApiResponse({ status: "IDLE", data: [] }),
  diseasesIpdOut: new ApiResponse({ status: "IDLE", data: [] }),
};
