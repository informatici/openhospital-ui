import { ILayoutsState } from "./types";

export const initial: ILayoutsState = {
  saveLayouts: { status: "IDLE" },
  getLayouts: { status: "IDLE" },
  resetLayouts: { status: "IDLE" },
  toolbox: {},
  layouts: {},
  breakpoint: "md",
};
