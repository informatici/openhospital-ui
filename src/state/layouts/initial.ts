import { ILayoutsState } from "./types";
import { ApiResponse } from "../types";

export const initial: ILayoutsState = {
  saveLayouts: new ApiResponse({ status: "IDLE" }),
  getLayouts: new ApiResponse({ status: "IDLE" }),
  resetLayouts: new ApiResponse({ status: "IDLE" }),
  toolbox: {},
  layouts: {},
  breakpoint: "md",
};
