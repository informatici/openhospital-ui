import { Layouts } from "react-grid-layout";
import { IApiResponse } from "../types";

/** @todo set good types */
export type ILayoutsState = {
  saveLayouts: IApiResponse<string>;
  getLayouts: IApiResponse<string>;
  resetLayouts: IApiResponse<boolean>;
  breakpoint: string;
  layouts: Layouts;
  toolbox: Layouts;
};
