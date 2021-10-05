export type IStatus = "ALL" | "PENDING" | "CLOSE" | "DELETE";
export interface IBillTableProps {
  status: IStatus;
  filter: TFilterValues;
}

export type TFilterValues = {
  fromDate: string;
  toDate: string;
  patientCode: number;
};
