import { IPatientsState } from "./types";

export const initial: IPatientsState = {
  createPatient: { isLoading: false },
  searchResults: { isLoading: false, data: [] },
  selectedPatient: { isLoading: false, data: {} },
};
