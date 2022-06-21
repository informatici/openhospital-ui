import { IOpdState } from "./types";

export const initial: IOpdState = {
  createOpd: { status: "IDLE" },
  updateOpd: { status: "IDLE" },
  getOpds: { status: "IDLE", data: [] },
  searchOpds: { status: "IDLE", data: [] },
  deleteOpd: { status: "IDLE" },
};
