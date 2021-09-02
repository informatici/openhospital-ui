import { IDiseaseState } from "./types";

export const initial: IDiseaseState = {
  diseasesOpd: { status: "IDLE", data: [] },
  diseasesIpdIn: { status: "IDLE", data: [] },
  diseasesIpdOut: { status: "IDLE", data: [] },
};
