import { IExaminationsState } from "./types";

export const initial: IExaminationsState = {
  createExamination: { status: "IDLE" },
  examinationsByPatientId: { status: "IDLE", data: [] },
};
