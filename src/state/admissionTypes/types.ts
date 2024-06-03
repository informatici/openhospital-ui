import { AdmissionTypeDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IAdmissionTypeState = {
  allAdmissionTypes: ApiResponse<Array<AdmissionTypeDTO>>;
};
