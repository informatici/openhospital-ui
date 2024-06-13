import { DiseaseTypeDTO } from "../../../generated";
import { ApiResponse } from "../../types";

export type IDiseaseTypesState = {
  getAll: ApiResponse<Array<DiseaseTypeDTO>>;
  create: ApiResponse<DiseaseTypeDTO>;
  update: ApiResponse<DiseaseTypeDTO>;
  delete: ApiResponse<boolean>;
};
