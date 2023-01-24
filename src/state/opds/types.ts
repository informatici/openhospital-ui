import { OpdDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOpdState = {
  getOpds: IApiResponse<Array<OpdDTO>>;
  searchOpds: IApiResponse<Array<OpdDTO>>;
  createOpd: IApiResponse<OpdDTO>;
  updateOpd: IApiResponse<OpdDTO>;
  deleteOpd: IApiResponse<null>;
};
