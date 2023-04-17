import { ILayoutsState } from "./types";

export const initial: ILayoutsState = {
  createLayouts: { status: "IDLE" },
  getLayouts: { status: "IDLE", data: [] },
  resetLayouts: { status: "IDLE" },
};
