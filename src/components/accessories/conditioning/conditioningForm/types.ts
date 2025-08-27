import { TFields } from "libraries/formDataHandling/types";

interface IConditioningFormProps {
  fields: TFields<ConditioningFormFieldName>;
  submitButtonLabel: string;
  resetButtonLabel: string;
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
