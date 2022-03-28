import { VisitDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IVisitState = {
  getVisits: IApiResponse<Array<VisitDTO>>;
  createVisit: IApiResponse<null>;
  updateVisit: IApiResponse<null>;
  deleteVisit: IApiResponse<null>;
  deleteVisits: IApiResponse<null>;
};
