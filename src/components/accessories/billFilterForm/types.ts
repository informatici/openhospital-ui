import { TFields } from "../../../libraries/formDataHandling/types";

interface IBillFilterProps {
  onSubmit: (filter: TBillFilterValues) => void;
  className: string;
  fields: TFields<BillFilterFormFieldName>;
}

export type BillFilterProps = IBillFilterProps;

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
