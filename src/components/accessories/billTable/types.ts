import { TFields } from "../../../libraries/formDataHandling/types";

export type IStatus = "ALL" | "PENDING" | "CLOSE" | "DELETE";
export interface IBillTableProps {
  fields: TFields<BillFilterFormFieldName>;
}

export type TFilterValues = {
  fromDate: string;
  toDate: string;
  patientCode: number;
  status?: IStatus;
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
  | "status"
  | "month"
  | "year";
