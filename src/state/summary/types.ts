import { ApiResponse } from "../types";

export type ISummaryState = {
  summaryApisCall: ApiResponse<Array<SummaryDataType>>;
};

export type SummaryDataType = {
  date: string;
  type: string;
  result: string;
  note: string;
};
