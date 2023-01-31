import { OpdDTO, OpdWithOperatioRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOpdState = {
  getOpds: IApiResponse<Array<OpdWithOperatioRowDTO>>;
  searchOpds: IApiResponse<Array<OpdDTO>>;
  createOpd: IApiResponse<OpdWithOperatioRowDTO>;
  updateOpd: IApiResponse<OpdWithOperatioRowDTO>;
  deleteOpd: IApiResponse<null>;
};
