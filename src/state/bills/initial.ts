import { IBillsState } from "./types";
import { ApiResponse } from "../types";

export const initial: IBillsState = {
  newBill: new ApiResponse({ status: "IDLE" }),
  updateBill: new ApiResponse({ status: "IDLE" }),
  getBill: new ApiResponse({ status: "IDLE" }),
  searchBills: new ApiResponse({ status: "IDLE", data: [] }),
  getPendingBills: new ApiResponse({ status: "IDLE", data: [] }),
  searchPayments: new ApiResponse({ status: "IDLE", data: [] }),
  delete: new ApiResponse({ status: "IDLE" }),
  payBill: new ApiResponse({ status: "IDLE" }),
  closeBill: new ApiResponse({ status: "IDLE" }),
  getBillsByYear: new ApiResponse({ status: "IDLE", data: [] }),
};
