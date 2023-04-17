import { IApiResponse } from "../types";

export type ILayoutsState = {
  createLayouts: IApiResponse<any>;
  getLayouts: IApiResponse<any>;
  resetLayouts: IApiResponse<any>;
};
