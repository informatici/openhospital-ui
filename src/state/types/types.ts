import { ITypeConfigsState } from "./config";
import { IDiseaseTypesState } from "./diseases";
import { IOperationTypesState } from "./operations";
import { IVaccineTypesState } from "./vaccines";
import { IExamTypesState } from "./exams";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  diseases: IDiseaseTypesState;
  operations: IOperationTypesState;
  config: ITypeConfigsState;
  exams: IExamTypesState;
};
