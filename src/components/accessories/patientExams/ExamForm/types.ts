import { LaboratoryDTO, LabWithRowsDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IExamProps {
  fields: TFields<ExamFormFieldName>;
  onSubmit: (lab: LaboratoryDTO, rows: string[]) => void;
  labToEdit?: LaboratoryDTO;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  creationMode: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
  labWithRowsToEdit: LabWithRowsDTO;
}

export type ExamProps = IExamProps;

export type ExamFormFieldName =
  | "exam"
  | "examDate"
  | "material"
  | "result"
  | "note";
