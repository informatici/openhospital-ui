import { FormikProps } from "formik";
import { AgeTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IAgeTypesFormProps {
  rows: TFields<AgeTypeFormFieldName>[];
  onSubmit: (ageType: AgeTypeDTO[]) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export interface IAgeTypeFieldsProps {
  isValid: (fieldName: string, index: number) => boolean;
  getErrorText: (fieldName: string, index: number) => string;
  formik: FormikProps<{ ageTypes: Record<string, any>[] }>;
  index: number;
}

export type AgeTypeFormFieldName = "code" | "description" | "from" | "to";
