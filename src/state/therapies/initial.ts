import { ITherapiesState } from "./types";

export const initial: ITherapiesState = {
  createTherapy: { status: "IDLE" },
  therapiesByPatientId: { status: "IDLE", data: [] },
};
