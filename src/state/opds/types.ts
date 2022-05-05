import { OpdDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IOpdState = {
  getOpds: IApiResponse<Array<OpdDTO>>;
  getLastOpd: IApiResponse<OpdDTO | null>;
  createOpd: IApiResponse<null>;
  updateOpd: IApiResponse<null>;
  deleteOpd: IApiResponse<null>;
};
