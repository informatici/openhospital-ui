import { IMedicalsState } from "./types";

export const initial: IMedicalsState = {
  newMedical: { status: "IDLE" },
  searchMedical: { status: "IDLE", data: [] },
  editMedical: { status: "IDLE" },
  deleteMedical: { status: "IDLE" },
};
