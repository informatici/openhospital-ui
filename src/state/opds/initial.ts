import { IOpdState } from "./types";

export const initial: IOpdState = {
  createOpd: { status: "IDLE" },
  getOpds: { status: "IDLE", data: [] },
};
