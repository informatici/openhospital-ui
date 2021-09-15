import { TFields } from "../../../libraries/formDataHandling/types";

interface IBillFilterProps {
  fields?: TFields<BillFilterFormFieldName>;
  onSubmit: (filter: any) => void;
  submitButtonLabel?: string;
  resetButtonLabel?: string;
  isLoading?: boolean;
  shouldResetForm?: boolean;
  resetFormCallback?: () => void;
  className: string;
  theme: string;
}

export type BillFilterProps = IBillFilterProps;

export type BillFilterFormFieldName =
  | "user"
  | "fromDate"
  | "toDate"
  | "patient"
  | "billItem"
  | "affiliate";
