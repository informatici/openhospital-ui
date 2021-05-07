import { PatientExaminationDTO, TherapyDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface ITherapyProps {
  fields: TFields<TherapyFormFieldName>;
  onSubmit: (triage: TherapyDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type TherapyProps = ITherapyProps;

export type TherapyFormFieldName =
  | "dates"
  | "medical"
  | "qty"
  | "units"
  | "freqInDay"
  | "note"
  | "notify"
  | "sms";

  
  
