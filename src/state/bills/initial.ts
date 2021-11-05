import { IBillsState } from "./types";

export const initial: IBillsState = {
  newBill: { status: "IDLE" },
  getBill: { status: "IDLE", data: {} },
  searchBills: { status: "IDLE", data: [] },
  getPendingBills: { status: "IDLE", data: [] },
  searchPayments: { status: "IDLE", data: [] },
  delete: { status: "IDLE" },
};
