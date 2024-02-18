import { IOpdState } from "./types";

export const initial: IOpdState = {
  createOpd: { status: "IDLE" },
  updateOpd: { status: "IDLE" },
  getOpds: { status: "IDLE", data: [] },
  lastOpd: { status: "IDLE", data: undefined },
  searchOpds: { status: "IDLE" },
  deleteOpd: { status: "IDLE" },
};
