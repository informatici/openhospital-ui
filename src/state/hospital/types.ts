import { HospitalDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IHospitalState = {
  getHospital: ApiResponse<HospitalDTO>;
  updateHospital: ApiResponse<HospitalDTO>;
};
