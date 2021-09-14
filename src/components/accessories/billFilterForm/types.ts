import { TFields } from "../../../libraries/formDataHandling/types";

interface IBillFilterProps {
  fields?: TFields<BillFilterFormFieldName>;
  onSubmit: (filter: any) => void;
  submitButtonLabel?: string;
  resetButtonLabel?: string;
  isLoading?: boolean;
  shouldResetForm?: boolean;
  resetFormCallback?: () => void;
}

export type BillFilterProps = IBillFilterProps;

export type BillFilterFormFieldName =
  | "user"
  | "startDate"
  | "endDate"
  | "patient"
  | "billItem"
  | "affiliate";
