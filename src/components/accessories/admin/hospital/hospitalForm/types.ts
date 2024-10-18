import { HospitalDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";

export interface IHospitalFormProps {
  fields: TFields<HospitalFormFieldName>;
  onSubmit: (adm: HospitalDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type HospitalFormFieldName =
  | "description"
  | "address"
  | "city"
  | "telephone"
  | "fax"
  | "email"
  | "currencyCod";
