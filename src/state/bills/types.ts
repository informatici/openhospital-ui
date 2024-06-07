import { BillDTO, BillPaymentsDTO } from "../../generated";
import { FullBillDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IBillsState = {
  newBill: ApiResponse<FullBillDTO>;
  updateBill: ApiResponse<FullBillDTO>;
  getBill: ApiResponse<BillDTO>;
  searchBills: ApiResponse<FullBillDTO[]>;
  getPendingBills: ApiResponse<FullBillDTO[]>;
  searchPayments: ApiResponse<BillPaymentsDTO[]>;
  delete: ApiResponse<void>;
  payBill: ApiResponse<FullBillDTO>;
  closeBill: ApiResponse<FullBillDTO>;
  getBillsByYear: ApiResponse<FullBillDTO[]>;
};
