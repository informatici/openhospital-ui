import { ILaboratoriesState } from "./types";

export const initial: ILaboratoriesState = {
  createLab: { status: "IDLE" },
  createLabRequest: { status: "IDLE" },
  deleteLab: { status: "IDLE" },
  cancelLab: { status: "IDLE" },
  updateLab: { status: "IDLE" },
  materials: { status: "IDLE", data: [] },
  labsByPatientId: { status: "IDLE", data: [] },
  labsRequestByPatientId: { status: "IDLE", data: [] },
  getLabByCode: { status: "IDLE", data: null },
  getLabWithRowsByCode: { status: "IDLE", data: null },
  searchLabs: { status: "IDLE" },
};
