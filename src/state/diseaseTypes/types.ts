import { DiseaseTypeDTO } from "../../generated";
import { IApiResponse } from "../types";

export type IDiseaseTypeState = {
  getDiseaseTypes: IApiResponse<Array<DiseaseTypeDTO>>;
};
