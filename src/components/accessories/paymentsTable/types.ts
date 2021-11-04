export interface IPaymentsTableProps {
  filter: TFilterValues;
}

export type TFilterValues = {
  fromDate: string;
  toDate: string;
  patientCode: number;
};
