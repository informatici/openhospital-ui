import { BillDTO, BillPaymentsDTO } from "../../generated";
import { FullBillDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IBillsState = {
  newBill: IApiResponse<FullBillDTO>;
  getBill: IApiResponse<BillDTO>;
  searchBills: IApiResponse<FullBillDTO[]>;
  getPendingBills: IApiResponse<FullBillDTO[]>;
  searchPayments: IApiResponse<BillPaymentsDTO[]>;
};
