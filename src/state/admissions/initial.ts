import { IAdmissionsState } from "./types";

export const initial: IAdmissionsState = {
  createAdmission: { status: "IDLE" },
  updateAdmission: { status: "IDLE" },
  admissionsByPatientId: { status: "IDLE", data: [] },
  currentAdmissionByPatientId: { status: "IDLE", data: undefined },
};
