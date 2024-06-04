import { IHospitalState } from "./types";
import { ApiResponse } from "../types";

export const initial: IHospitalState = {
  getHospital: new ApiResponse({ status: "IDLE" }),
};
