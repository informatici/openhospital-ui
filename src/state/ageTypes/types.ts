import { AgeTypeDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IAgeTypeState = {
  getAllAgeTypes: IApiResponse<Array<AgeTypeDTO>>;
};
