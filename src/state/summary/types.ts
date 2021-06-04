import { IApiResponse } from "../types";

export type ISummaryState = {
  loadSummaryData: IApiResponse<Array<any>>;
};

export type SummaryData = {
  date: string;
  type: string;
  result: string;
  note: string;
};
