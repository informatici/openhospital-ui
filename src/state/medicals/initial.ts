import { IMedicalState } from "./types";
import { ApiResponse } from "../types";

export const initial: IMedicalState = {
  medicalsOrderByName: new ApiResponse({
    status: "IDLE",
    data: [],
  }),
};
