import { IVaccineTypesState } from "./types";

export const initial: IVaccineTypesState = {
  getVaccineTypes: { status: "IDLE", data: [] },
  create: { status: "IDLE" },
  update: { status: "IDLE" },
  delete: { status: "IDLE" },
  selectedVaccineType: null,
};
