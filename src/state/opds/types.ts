import { OpdDTO, OpdWithOperatioRowDTO, PageOfOpdDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOpdState = {
  getOpds: IApiResponse<Array<OpdWithOperatioRowDTO>>;
  lastOpd: IApiResponse<OpdDTO>;
  searchOpds: IApiResponse<PageOfOpdDTO>;
  createOpd: IApiResponse<OpdWithOperatioRowDTO>;
  updateOpd: IApiResponse<OpdWithOperatioRowDTO>;
  deleteOpd: IApiResponse<null>;
};
