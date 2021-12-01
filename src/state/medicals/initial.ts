import { MedicalDTO } from "../../generated";
import { IMedicalsState } from "./types";

export const initial: IMedicalsState = {
  newMedical: { status: "IDLE" },
  getMedicals: { status: "IDLE", data: [] },
  filterMedicals: { status: "IDLE", data: [] },
  selectedMedical:  { status: "IDLE", data: {} },
  editMedical: { status: "IDLE" },
  deleteMedical: { status: "IDLE" },
};