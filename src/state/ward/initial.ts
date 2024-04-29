import { IWardState } from "./types";

export const initial: IWardState = {
  allWards: { status: "IDLE", data: [] },
  create: { status: "IDLE" },
  update: { status: "IDLE" },
  delete: { status: "IDLE" },
};
