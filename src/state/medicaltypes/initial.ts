import { IMedicalTypesState } from "./types";

export const initial: IMedicalTypesState = {
  createMedicalType: { status: "IDLE" },
  getMedicalType: { status: "IDLE", data: [] },
  editMedicalType: { status: "IDLE" },
  deleteMedicalType: { status: "IDLE" },
};
