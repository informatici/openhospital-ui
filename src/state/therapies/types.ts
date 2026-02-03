import { TherapyRowDTO } from "../../generated";
import { ApiResponse } from "../types";

export type ITherapiesState = {
  createTherapy: ApiResponse<TherapyRowDTO>;
  updateTherapy: ApiResponse<TherapyRowDTO>;
  therapiesByPatientId: ApiResponse<Array<TherapyRowDTO>>;
  deleteTherapy: ApiResponse<TherapyRowDTO>;
};
