import { IAdmissionsState } from "./types";

export const initial: IAdmissionsState = {
  createAdmission: { status: "IDLE" },
  updateAdmission: { status: "IDLE" },
  getAdmissions: { status: "IDLE", data: [] },
  getPatientAdmissions: { status: "IDLE", data: [] },
  getDischarges: { status: "IDLE", data: [] },
  getAdmittedPatients: { status: "IDLE", data: [] },
  currentAdmissionByPatientId: { status: "IDLE", data: undefined },
  dischargePatient: { status: "IDLE" },
};
