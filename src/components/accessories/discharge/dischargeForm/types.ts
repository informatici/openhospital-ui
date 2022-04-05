import { AdmissionDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IDischargeProps {
  fields: TFields<DischargeFormFieldName>;
  onSubmit: (adm: AdmissionDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
  admission: AdmissionDTO | undefined;
}

export type DischargeProps = IDischargeProps;

export type DischargeFormFieldName =
  | "disDate"
  | "disType"
  | "bedDays"
  | "diseaseOut"
  | "cliDiaryCharge"
  | "imageryCharge";
