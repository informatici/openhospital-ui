import { TFields } from "../../../libraries/formDataHandling/types";

interface IBillFilterProps {
  onSubmit: (filter: any) => void;
  className: string;
}

export type BillFilterProps = IBillFilterProps;

export type TValues = Record<TFieldName, string>;

export type TFieldName =
  | "id"
  | "firstName"
  | "secondName"
  | "birthDate"
  | "address";

export type BillFilterFormFieldName =
  | "user"
  | "fromDate"
  | "toDate"
  | "patient"
  | "billItem"
  | "affiliate";
