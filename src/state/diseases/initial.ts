import { IDiseaseState } from "./types";

export const initial: IDiseaseState = {
  allDiseases: { status: "IDLE", data: [] },
  diseasesOpd: { status: "IDLE", data: [] },
  diseasesIpdIn: { status: "IDLE", data: [] },
  diseasesIpdOut: { status: "IDLE", data: [] },
  create: { status: "IDLE" },
  update: { status: "IDLE" },
};
