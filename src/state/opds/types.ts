import { OpdDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOpdState = {
  getOpds: IApiResponse<Array<OpdDTO>>;
  createOpd: IApiResponse<null>;
};
