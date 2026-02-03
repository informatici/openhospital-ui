import { Layouts } from "react-grid-layout";
import { ApiResponse } from "../types";
import { UserSettingDTO } from "../../generated";

/** @todo set good types */
export type ILayoutsState = {
  saveLayouts: ApiResponse<UserSettingDTO>;
  getLayouts: ApiResponse<UserSettingDTO>;
  resetLayouts: ApiResponse<boolean>;
  breakpoint: string;
  layouts: Layouts;
  toolbox: Layouts;
};
