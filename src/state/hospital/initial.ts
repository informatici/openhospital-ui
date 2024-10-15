import { ApiResponse } from "../types";
import { IHospitalState } from "./types";

export const initial: IHospitalState = {
  getHospital: new ApiResponse({ status: "IDLE" }),
  updateHospital: new ApiResponse({ status: "IDLE" }),
};
