import { IDiseaseTypeState } from "./types";

export const initial: IDiseaseTypeState = {
  getDiseaseTypes: { status: "IDLE", data: [] },
};
