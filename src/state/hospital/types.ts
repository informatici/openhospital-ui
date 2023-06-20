import { HospitalDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IHospitalState = {
  getHospital: IApiResponse<HospitalDTO>;
};
