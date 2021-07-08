import { ISummaryState, SummaryDataType } from "./types";

export const initial: ISummaryState = {
  summaryApisCall: { data: new Array<SummaryDataType>(), status: "IDLE" },
};
