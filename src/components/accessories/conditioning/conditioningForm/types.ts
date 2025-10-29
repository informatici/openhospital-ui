import { TFields } from "libraries/formDataHandling/types";
import { ConditioningDTO } from "../../../../generated";

interface IConditioningFormProps {
  fields: TFields<ConditioningFormFieldName>;
  onSubmit: (conditioning: ConditioningDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type ConditioningFormProps = IConditioningFormProps;

export type ConditioningFormFieldName =
  | "aspiration"
  | "mce"
  | "ventilation"
  | "oxygenDebit"
  | "sgVolume"
  | "diazepamDose"
  | "bolusSsVolume"
  | "sngNumber"
  | "others"
  | "performedAt"
  | "conditionAtAdmission"
  | "cpap"
  | "malaria"
  | "hivTest"
  | "bloodGlucoseLevel"
  | "performedBy";
