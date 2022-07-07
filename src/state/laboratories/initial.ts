import { ILaboratoriesState } from "./types";

export const initial: ILaboratoriesState = {
  createLab: { status: "IDLE" },
  deleteLab: { status: "IDLE" },
  updateLab: { status: "IDLE" },
  materials: { status: "IDLE", data: [] },
  labsByPatientId: { status: "IDLE", data: [] },
  searchLabs: { status: "IDLE", data: [] },
};
