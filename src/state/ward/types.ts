import { WardDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IWardState = {
  allWards: IApiResponse<Array<WardDTO>>;
};
