import { DiseaseDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IDiseaseState = {
  diseasesOpd: IApiResponse<Array<DiseaseDTO>>;
  diseasesIpdIn: IApiResponse<Array<DiseaseDTO>>;
  diseasesIpdOut: IApiResponse<Array<DiseaseDTO>>;
};
