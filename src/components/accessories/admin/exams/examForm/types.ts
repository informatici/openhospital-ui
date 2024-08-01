import { ExamDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";
import { ExamProps } from "../types";

export interface IExamProps {
  fields: TFields<ExamProps>;
  onSubmit: (exam: ExamDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}
