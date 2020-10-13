import { IPatientsState } from "./types";

export const initial: IPatientsState = {
  createPatient: { status: "IDLE", isLoading: false, hasSucceeded: false },
  searchResults: { isLoading: false, data: [] },
  selectedPatient: { isLoading: false, data: {} },
};
