import { TFields } from "../../../../libraries/formDataHandling/types";

export interface IExamFilterProps {
  fields: TFields<ExamFilterFormFieldName>;
  onSubmit: (values: any) => void;
}

export type IStatus = -1 | 1 | 2;

export type TFilterValues = {
  dateFrom?: string;
  dateTo?: string;
  examName?: string;
  patientCode?: number;
  status?: IStatus;
};

export type TExamFilterValues = Record<ExamFilterFormFieldName, string>;

export type ExamFilterFormFieldName =
  | "dateFrom"
  | "dateTo"
  | "examName"
  | "patientCode"
  | "status";
