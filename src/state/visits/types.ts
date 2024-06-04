import { VisitDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IVisitState = {
  getVisits: ApiResponse<Array<VisitDTO>>;
  createVisit: ApiResponse<VisitDTO>;
  updateVisit: ApiResponse<VisitDTO>;
};
