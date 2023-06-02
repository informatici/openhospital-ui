import { Layouts } from "react-grid-layout";
import { IApiResponse } from "../types";
import { UserSettingDTO } from "../../generated";

/** @todo set good types */
export type ILayoutsState = {
  saveLayouts: IApiResponse<UserSettingDTO>;
  getLayouts: IApiResponse<UserSettingDTO>;
  resetLayouts: IApiResponse<boolean>;
  breakpoint: string;
  layouts: Layouts;
  toolbox: Layouts;
};
