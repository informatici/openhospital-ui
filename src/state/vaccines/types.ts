import { VaccineDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IVaccineState = {
  vaccineList: IApiResponse<Array<VaccineDTO>>;
};
