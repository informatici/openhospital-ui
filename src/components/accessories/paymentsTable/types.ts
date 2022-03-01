import { TFields } from "../../../libraries/formDataHandling/types";

export interface IPaymentsTableProps {
  fields: TFields<PaymentsFilterFormFieldName>;
}

export type TPaymentsFilterValues = Record<PaymentsFilterFormFieldName, string>;

export type PaymentsFilterFormFieldName = "fromDate" | "toDate" | "patientCode";
