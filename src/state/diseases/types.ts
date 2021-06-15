import { DiseaseDTO, TherapyRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IDiseaseState = {
  diseasesOpd: IApiResponse<Array<DiseaseDTO>>;
};
