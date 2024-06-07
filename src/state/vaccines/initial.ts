import { ApiResponse } from "../types";
import { IVaccineState } from "./types";

export const initial: IVaccineState = {
  vaccineList: new ApiResponse({ status: "IDLE", data: [] }),
};
