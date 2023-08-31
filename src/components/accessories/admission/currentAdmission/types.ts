import { AdmissionDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface ICurrentAdmissionProps {
  fields: TFields<AdmissionFormFieldName>;
  onSubmit: (adm: AdmissionDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  admitted: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type CurrentAdmissionProps = ICurrentAdmissionProps;

export type AdmissionFormFieldName =
  | "ward"
  | "transUnit"
  | "admDate"
  | "admType"
  | "diseaseIn"
  | "fhu"
  | "note"
  | "disDate"
  | "disType"
  | "bedDays"
  | "diseaseOut1"
  | "diseaseOut2"
  | "diseaseOut3"
  | "cliDiaryCharge"
  | "imageryCharge";
