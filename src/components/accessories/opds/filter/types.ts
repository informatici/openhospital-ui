import { TFields } from "../../../../libraries/formDataHandling/types";

export interface IOpdFilterProps {
  fields: TFields<OpdFilterFormFieldName>;
  onSubmit: (values: any) => void;
  handleResetFilter: () => void;
}
export type IStatus = "" | "A" | "R";
export type ISex = "" | "F" | "M" | "U";

export type TFilterValues = {
  dateFrom?: string;
  dateTo?: string;
  ageFrom?: number;
  ageTo?: number;
  diseaseCode?: string;
  diseaseTypeCode?: string;
  sex?: ISex;
  newPatient?: IStatus;
  patientCode?: number;
  page?: number;
  size?: number;
};

export type TOpdFilterValues = Record<OpdFilterFormFieldName, string>;

export type OpdFilterFormFieldName =
  | "dateFrom"
  | "dateTo"
  | "ageFrom"
  | "ageTo"
  | "newPatient"
  | "patientCode"
  | "diseaseCode"
  | "diseaseTypeCode"
  | "sex";

export interface IFilterAction {
  type: "update";
  payload: any;
}
