import { IOpdState } from "./types";

export const initial: IOpdState = {
  getOpds: { status: "IDLE", data: [] },
};
