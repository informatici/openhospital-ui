import { DiseaseTypeDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IDiseaseTypeState = {
  getDiseaseTypes: ApiResponse<Array<DiseaseTypeDTO>>;
};
