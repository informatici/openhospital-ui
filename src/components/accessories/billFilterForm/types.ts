import { TFields } from "../../../libraries/formDataHandling/types";

interface IBillFilterProps {
  onSubmit: (filter: any) => void;
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

export type BillFilterFormFieldName = "fromDate" | "toDate" | "patient";
