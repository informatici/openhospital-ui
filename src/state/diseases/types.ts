import { DiseaseDTO, TherapyRowDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IDiseaseState = {
  getDiseases: IApiResponse<Array<DiseaseDTO>>;
};
