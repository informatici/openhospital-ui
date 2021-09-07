import { IBillsState } from "./types";

export const initial: IBillsState = {
  newBill: { status: "IDLE" },
  getBill: { status: "IDLE", data: {} },
};
