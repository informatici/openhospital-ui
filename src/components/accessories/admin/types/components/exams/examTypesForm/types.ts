import { ExamTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IExamTypeFormProps {
  fields: TFields<ExamTypeFormFieldName>;
  onSubmit: (adm: ExamTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type ExamTypeFormFieldName = "code" | "description";
