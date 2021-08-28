import { DischargeTypeDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IDischargeTypeState = {
  allDischargeTypes: IApiResponse<Array<DischargeTypeDTO>>;
};
