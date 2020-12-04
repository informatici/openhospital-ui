import { IPatientsState } from "./types";

export const initial: IPatientsState = {
  createPatient: { status: "IDLE" },
  searchResults: { status: "IDLE", data: [] },
  selectedPatient: { status: "IDLE", data: {} },
  updatePatient: { status: "IDLE" },
};
