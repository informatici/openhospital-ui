import { OpdDTO, OpdWithOperationRowDTO, PageOpdDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOpdState = {
  getOpds: IApiResponse<Array<OpdWithOperationRowDTO>>;
  lastOpd: IApiResponse<OpdDTO>;
  searchOpds: IApiResponse<PageOpdDTO>;
  createOpd: IApiResponse<OpdWithOperationRowDTO>;
  updateOpd: IApiResponse<OpdWithOperationRowDTO>;
  deleteOpd: IApiResponse<null>;
};
