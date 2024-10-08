import { TFields } from "../../../../libraries/formDataHandling/types";

export interface IExamFilterProps {
  fields: TFields<ExamFilterFormFieldName>;
  onSubmit: (values: any) => void;
  handleResetFilter: () => void;
}

export type TFilterValues = {
  dateFrom?: string;
  dateTo?: string;
  examName?: string;
  patientCode?: number;
  status?: string;
  page?: number;
  size?: number;
};

export type TExamFilterValues = Record<ExamFilterFormFieldName, string>;

export type ExamFilterFormFieldName =
  | "dateFrom"
  | "dateTo"
  | "examName"
  | "patientCode"
  | "status";
