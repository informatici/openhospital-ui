import { WardDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IWardState = {
  allWards: IApiResponse<Array<WardDTO>>;
  create: IApiResponse<WardDTO>;
  update: IApiResponse<WardDTO>;
  delete: IApiResponse<boolean>;
};
