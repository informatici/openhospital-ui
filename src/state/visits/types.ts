import { VisitDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IVisitState = {
  getVisits: IApiResponse<Array<VisitDTO>>;
};
