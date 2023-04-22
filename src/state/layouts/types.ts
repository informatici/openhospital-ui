import { Layouts } from "react-grid-layout";
import { IApiResponse } from "../types";

/** @todo set good types */
export type ILayoutsState = {
  saveLayouts: IApiResponse<any>;
  getLayouts: IApiResponse<any>;
  resetLayouts: IApiResponse<any>;
  breakpoint: string;
  toolbox?: Layouts;
};
