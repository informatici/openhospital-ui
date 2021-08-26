import { IAdmissionsState } from "./types";

export const initial: IAdmissionsState = {
  createAdmission: { status: "IDLE" },
  admissionsByPatientId: { status: "IDLE", data: [] },
};
