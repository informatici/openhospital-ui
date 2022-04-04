import { AdmissionDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IAdmissionProps {
  fields: TFields<AdmissionFormFieldName>;
  onSubmit: (adm: AdmissionDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  admitted?: boolean;
  resetFormCallback: () => void;
}

export type AdmissionProps = IAdmissionProps;

export type AdmissionFormFieldName =
  | "ward"
  | "transUnit"
  | "admDate"
  | "admType"
  | "diseaseIn"
  | "note"
  | "admDate"
  | "disDate"
  | "disType"
  | "bedDays"
  | "diseaseOut"
  | "cliDiaryCharge"
  | "imageryCharge";
