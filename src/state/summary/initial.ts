import { ApiResponse } from "../types";
import { ISummaryState, SummaryDataType } from "./types";

export const initial: ISummaryState = {
  summaryApisCall: new ApiResponse({
    data: new Array<SummaryDataType>(),
    status: "IDLE",
  }),
};
