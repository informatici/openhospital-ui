import { AdmissionTypeDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IAdmissionTypeState = {
  allAdmissionTypes: IApiResponse<Array<AdmissionTypeDTO>>;
};
