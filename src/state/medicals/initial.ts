import { MedicalDTO } from "../../generated";
import { IMedicalState } from "./types";

export const initial: IMedicalState = {
  medicalsOrderByName: { status: "IDLE", data: new Array<MedicalDTO>() },
};
