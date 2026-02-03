import { MedicalDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IMedicalState = {
  medicalsOrderByName: ApiResponse<Array<MedicalDTO>>;
  create: ApiResponse<MedicalDTO>;
  update: ApiResponse<MedicalDTO>;
  delete: ApiResponse<void>;
};
