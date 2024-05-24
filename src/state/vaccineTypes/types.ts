import { VaccineTypeDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IVaccineTypesState = {
  getVaccineTypes: IApiResponse<Array<VaccineTypeDTO>>;
  create: IApiResponse<VaccineTypeDTO>;
  update: IApiResponse<VaccineTypeDTO>;
  delete: IApiResponse<boolean>;
  selectedVaccineType: VaccineTypeDTO | null;
};
