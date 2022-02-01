import { ISurgicalRecordsState } from "./types";

export const initial: ISurgicalRecordsState = {
  createSurgicalRecord: { status: "IDLE" },
  updateSurgicalRecord: { status: "IDLE" },
  surgicalRecordsByPatientId: { status: "IDLE", data: [] },
  currentSurgicalRecordByPatientId: { status: "IDLE", data: undefined },
};
