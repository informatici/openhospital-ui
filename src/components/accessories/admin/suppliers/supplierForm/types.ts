import { SupplierDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";

export interface ISupplierFormProps {
  fields: TFields<SupplierFormFieldName>;
  onSubmit: (adm: SupplierDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type SupplierFormFieldName =
  | "supId"
  | "supName"
  | "supAddress"
  | "supTaxcode"
  | "supPhone"
  | "supFax"
  | "supEmail"
  | "supNote";
