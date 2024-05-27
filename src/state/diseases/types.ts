import { DiseaseDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IDiseaseState = {
  allDiseases: IApiResponse<Array<DiseaseDTO>>;
  diseasesOpd: IApiResponse<Array<DiseaseDTO>>;
  diseasesIpdIn: IApiResponse<Array<DiseaseDTO>>;
  diseasesIpdOut: IApiResponse<Array<DiseaseDTO>>;
  create: IApiResponse<DiseaseDTO>;
  update: IApiResponse<DiseaseDTO>;
};
