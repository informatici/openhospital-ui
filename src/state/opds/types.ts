import { OpdDTO, OpdWithOperatioRowDTO, PageOpdDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOpdState = {
  getOpds: IApiResponse<Array<OpdWithOperatioRowDTO>>;
  lastOpd: IApiResponse<OpdDTO>;
  searchOpds: IApiResponse<PageOpdDTO>;
  createOpd: IApiResponse<OpdWithOperatioRowDTO>;
  updateOpd: IApiResponse<OpdWithOperatioRowDTO>;
  deleteOpd: IApiResponse<null>;
};
