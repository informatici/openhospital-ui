import { TFields } from "../../../../libraries/formDataHandling/types";

interface IExamProps {
  fields: TFields<ExamFormFieldName>;
  onSubmit: (therapy: TherapyRowDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type ExamProps = IExamProps;

export type ExamFormFieldName =
  | "exam"
  | "date"
  | "material"
  | "type"
  | "result"
  | "note";
