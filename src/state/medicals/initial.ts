import { MedicalDTO } from "../../generated";
import { IMedicalsState } from "./types";

export const initial: IMedicalsState = {
  newMedical: { status: "IDLE" },
  getMedicals: { status: "IDLE", data: Array<MedicalDTO>() },
  editMedical: { status: "IDLE" },
  deleteMedical: { status: "IDLE" },
};
