import { VaccineDTO } from "../../generated";
import { IVaccineState } from "./types";

export const initial: IVaccineState = {
  vaccineList: { status: "IDLE", data: new Array<VaccineDTO>() },
};
