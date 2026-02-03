import { IMedicalState } from "./types";
import { ApiResponse } from "../types";

export const initial: IMedicalState = {
  medicalsOrderByName: new ApiResponse({
    status: "IDLE",
    data: [],
  }),
  create: new ApiResponse({
    status: "IDLE",
  }),
  update: new ApiResponse({
    status: "IDLE",
  }),
  delete: new ApiResponse({
    status: "IDLE",
  }),
};
