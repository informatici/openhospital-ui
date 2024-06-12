import { ITypeConfigsState } from "./config";
import { IOperationTypesState } from "./operations";
import { IVaccineTypesState } from "./vaccines";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  operations: IOperationTypesState;
  config: ITypeConfigsState;
};
