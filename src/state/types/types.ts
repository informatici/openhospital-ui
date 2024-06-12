import { ITypeConfigsState } from "./config";
import { IVaccineTypesState } from "./vaccines";
import { IExamTypesState } from "./exams";

export type ITypesState = {
  vaccines: IVaccineTypesState;
  config: ITypeConfigsState;
  exams: IExamTypesState;
};
