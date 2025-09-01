import { TFields } from "libraries/formDataHandling/types";
import { ConditioningDTO } from "../../../../generated";

interface IConditioningFormProps {
  fields: TFields<ConditioningFormFieldName>;
  onSubmit: (conditioning: ConditioningDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type ConditioningFormProps = IConditioningFormProps;

export type ConditioningFormFieldName =
  | "aspiration"
  | "mceDuree"
  | "ventilationDuree"
  | "oxygeneDebit"
  | "sgVolume"
  | "diazepamDose"
  | "bolusSsVolume"
  | "sngNumero"
  | "others"
  | "performBy"
  | "performAt";
