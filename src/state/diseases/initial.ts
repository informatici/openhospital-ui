import { IDiseaseState } from "./types";

export const initial: IDiseaseState = {
  getDiseases: { status: "IDLE", data: [] },
};
