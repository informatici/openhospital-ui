import { PatientDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IExamRequestProps {
  fields: TFields<ExamRequestFormFieldName>;
  patient?: PatientDTO;
}

export type ExamRequestFormFieldName = "exam" | "patientId" | "material";

export type ExamRequestProps = IExamRequestProps;
