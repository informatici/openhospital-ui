import { LaboratoryDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IExamProps {
  fields: TFields<ExamFormFieldName>;
  creationMode: boolean;
  labToEdit: LaboratoryDTO;
  handleReset: () => void;
}

export type ExamProps = IExamProps;

export type ExamFormFieldName =
  | "exam"
  | "patientCode"
  | "examDate"
  | "material"
  | "result"
  | "note";

export type ExamTransitionState = "IDLE" | "TO_RESET";
