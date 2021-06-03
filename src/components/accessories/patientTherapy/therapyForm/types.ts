import { PatientDTO, TherapyRowDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface ITherapyProps {
  fields: TFields<TherapyFormFieldName>;
  onSubmit: (therapy: TherapyRowDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type TherapyProps = ITherapyProps;

export type TherapyFormFieldName =
  | "medicalId"
  | "qty"
  | "nbDays"
  | "nbWeeks"
  | "nbMonths"
  | "freqInDay"
  | "freqInPeriod"
  | "startDate"
  | "endDate"
  | "notifyInt"
  | "smsInt"
  | "note";
