import { IVisitState } from "./types";

export const initial: IVisitState = {
  getVisits: { status: "IDLE", data: [] },
};
