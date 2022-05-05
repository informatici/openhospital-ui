import { LaboratoryDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IExamProps {
  fields: TFields<ExamFormFieldName>;
  onSubmit: (lab: LaboratoryDTO, rows: string[]) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  creationMode: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type ExamProps = IExamProps;

export type ExamFormFieldName =
  | "exam"
  | "examDate"
  | "material"
  | "result"
  | "note";
