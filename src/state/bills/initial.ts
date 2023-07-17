import { IBillsState } from "./types";

export const initial: IBillsState = {
  newBill: { status: "IDLE" },
  updateBill: { status: "IDLE" },
  getBill: { status: "IDLE", data: undefined },
  searchBills: { status: "IDLE", data: [] },
  getPendingBills: { status: "IDLE", data: [] },
  searchPayments: { status: "IDLE", data: [] },
  delete: { status: "IDLE" },
  payBill: { status: "IDLE" },
  closeBill: { status: "IDLE" },
  getBillsByYear: { status: "IDLE", data: [] },
};
