import { IApiResponse } from "../types";

export type ISummaryState = {
  summaryApisCall: IApiResponse<Array<SummaryDataType>>;
};

export type SummaryDataType = {
  date: string;
  type: string;
  result: string;
  note: string;
};
