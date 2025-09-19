import { ILaboratoriesState } from "./types";
import { ApiResponse } from "../types";

export const initial: ILaboratoriesState = {
  createLab: new ApiResponse({ status: "IDLE" }),
  createLabRequest: new ApiResponse({ status: "IDLE" }),
  deleteLab: new ApiResponse({ status: "IDLE" }),
  cancelLab: new ApiResponse({ status: "IDLE" }),
  updateLab: new ApiResponse({ status: "IDLE" }),
  materials: new ApiResponse({ status: "IDLE", data: [] }),
  labsByPatientId: new ApiResponse({ status: "IDLE", data: [] }),
  labsRequestByPatientId: new ApiResponse({ status: "IDLE", data: [] }),
  getLabByCode: new ApiResponse({ status: "IDLE" }),
  getLabWithRowsByCode: new ApiResponse({ status: "IDLE" }),
  searchLabs: new ApiResponse({ status: "IDLE" }),
};
