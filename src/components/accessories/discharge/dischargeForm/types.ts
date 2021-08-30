import { AdmissionDTO, PatientDTO, TherapyRowDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IDischargeProps {
  currentAdmission: AdmissionDTO;
  fields: TFields<DischargeFormFieldName>;
  onSubmit: (discharge: AdmissionDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type DischargeProps = IDischargeProps;
export type DischargeTransitionState = "IDLE" | "TO_RESET" | "FAIL";
export type DischargeFormFieldName =
  | "disDate"
  | "disType"
  | "bedDays"
  | "diseaseOut1"
  | "diseaseOut2"
  | "diseaseOut3"
  | "cliDiaryCharge"
  | "imageryCharge";
