import { DiseaseDTO, TherapyRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IDiseaseState = {
  diseasesAll: IApiResponse<Array<DiseaseDTO>>;
};
