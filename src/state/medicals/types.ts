import { MedicalDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IMedicalState = {
  medicalsOrderByName: IApiResponse<Array<MedicalDTO>>;
};
