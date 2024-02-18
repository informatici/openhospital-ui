import { IExaminationsState } from "./types";

export const initial: IExaminationsState = {
  createExamination: { status: "IDLE" },
  updateExamination: { status: "IDLE" },
  getDefaultPatientExamination: { status: "IDLE" },
  getLastByPatientId: { status: "IDLE" },
  examinationsByPatientId: { status: "IDLE", data: [] },
  deleteExamination: { status: "IDLE" },
};
