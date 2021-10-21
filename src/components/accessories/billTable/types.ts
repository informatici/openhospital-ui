import { TFields } from "../../../libraries/formDataHandling/types";
import { IBillSummary } from "../../activities/manageBillActivity/types";

export type IStatus = "ALL" | "PENDING" | "CLOSE" | "DELETE";
export interface IBillTableProps {
  fields: TFields<BillFilterFormFieldName>;
  handleSummaryChange: (summary: IBillSummary) => void;
}

export type TFilterValues = {
  fromDate: string;
  toDate: string;
  patientCode: number;
  status: IStatus;
};

export type TValues = Record<TFieldName, string>;

export type TFieldName =
  | "id"
  | "firstName"
  | "secondName"
  | "birthDate"
  | "address";

export type TBillFilterValues = Record<BillFilterFormFieldName, string>;

export type BillFilterFormFieldName =
  | "fromDate"
  | "toDate"
  | "patientCode"
  | "status";
