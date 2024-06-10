import { ITypeConfigsState } from "./config";
import { IVaccineTypesState } from "./vaccines";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  config: ITypeConfigsState;
};
