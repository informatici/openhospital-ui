import { DiseaseDTO } from "../../generated";
import { ApiResponse } from "../types";

export type IDiseaseState = {
  allDiseases: ApiResponse<Array<DiseaseDTO>>;
  diseasesOpd: ApiResponse<Array<DiseaseDTO>>;
  diseasesIpdIn: ApiResponse<Array<DiseaseDTO>>;
  diseasesIpdOut: ApiResponse<Array<DiseaseDTO>>;
};
