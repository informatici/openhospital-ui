import { WardDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";

export interface IWardProps {
  fields: TFields<WardFormFieldName>;
  onSubmit: (adm: WardDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type WardFormFieldName =
  | "code"
  | "description"
  | "beds"
  | "nurs"
  | "docs"
  | "opd"
  | "pharmacy"
  | "male"
  | "female"
  | "email"
  | "telephone"
  | "fax"
  | "visitDuration";
