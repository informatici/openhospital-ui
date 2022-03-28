import { IVisitState } from "./types";

export const initial: IVisitState = {
  getVisits: { status: "IDLE", data: [] },
  createVisit: { status: "IDLE" },
  updateVisit: { status: "IDLE" },
  deleteVisit: { status: "IDLE" },
  deleteVisits: { status: "IDLE" },
};
