import { IApiResponse } from "../types";

export type ISummaryState = {
  summaryData: IApiResponse<Array<SummaryDataType>>;
};

export type SummaryDataType = {
  date: string;
  type: string;
  result: string;
  note: string;
};
