import { OpdDTO, OpdWithOperationRowDTO, PageOpdDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IOpdState = {
  getOpds: ApiResponse<Array<OpdWithOperationRowDTO>>;
  lastOpd: ApiResponse<OpdDTO>;
  searchOpds: ApiResponse<PageOpdDTO>;
  createOpd: ApiResponse<OpdWithOperationRowDTO>;
  updateOpd: ApiResponse<OpdWithOperationRowDTO>;
  deleteOpd: ApiResponse<null>;
};
