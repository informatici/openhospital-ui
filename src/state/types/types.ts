import { ITypeConfigsState } from "./config";
import { IDiseaseTypesState } from "./diseases";
import { IVaccineTypesState } from "./vaccines";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  diseases: IDiseaseTypesState;
  config: ITypeConfigsState;
};
